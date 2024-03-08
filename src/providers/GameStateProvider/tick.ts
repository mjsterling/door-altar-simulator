import { Dispatch, SetStateAction } from "react";
import { freshGraardor, freshPlayer } from ".";

export const tick = (
  player: Player,
  setPlayer: Dispatch<SetStateAction<Player>>,
  graardor: Graardor,
  setGraardor: Dispatch<SetStateAction<Graardor>>,
  playerAction: PlayerAction,
  setPlayerAction: Dispatch<SetStateAction<PlayerAction>>,
  audio: {
    metronomeRef: React.RefObject<HTMLAudioElement> | null;
    shootSoundRef: React.RefObject<HTMLAudioElement> | null;
    punchSoundRef: React.RefObject<HTMLAudioElement> | null;
  }
) => {
  const { metronomeRef, shootSoundRef, punchSoundRef } = audio;
  if (metronomeRef?.current) {
    metronomeRef.current.currentTime = 0;
    metronomeRef.current.play();
  }

  let newPlayer = { ...player };
  let newGraardor = { ...graardor };
  let newAction = { ...playerAction };
  // handle dead cunts

  // player

  if (player.hp === 0) {
    playerAction = { action: "idle" };
    if (player.respawnTimer === 0) {
      newPlayer = freshPlayer();
      newGraardor = freshGraardor();
    } else {
      const newRespawnTimer =
        player.respawnTimer === -1 ? 10 : player.respawnTimer - 1;
      newPlayer = {
        ...freshPlayer(),
        hp: 0,
        respawnTimer: newRespawnTimer,
      };
      newGraardor = {
        ...freshGraardor(),
        respawnTimer: newRespawnTimer,
      };
    }

    setPlayer({ ...newPlayer });
    setGraardor({ ...newGraardor });
    setPlayerAction({ ...playerAction });

    return;
  }

  // graardor
  if (graardor.hp === 0) {
    if (graardor.respawnTimer === 0) {
      newGraardor = freshGraardor();
    } else {
      newGraardor = {
        ...freshGraardor(),
        hp: 0,
        respawnTimer:
          graardor.respawnTimer === -1 ? 10 : graardor.respawnTimer - 1,
      };
    }
  }

  // attack timer countdowns
  if (player.attackTimer > 0) {
    newPlayer.attackTimer = Math.max(0, player.attackTimer - 1);
  }
  if (graardor.attackTimer > 0) {
    newGraardor.attackTimer = Math.max(0, graardor.attackTimer - 1);
  }

  // move player
  if (
    playerAction.action === "moving" &&
    playerAction.row !== undefined &&
    playerAction.col !== undefined
  ) {
    if (playerAction.row === player.row && playerAction.col === player.col) {
      newAction = { action: "idle" };
    } else {
      const deltaX = playerAction.col - player.col;
      const deltaY = playerAction.row - player.row;
      const deltaDiff = deltaX - deltaY;

      // orthogonal
      if (Math.abs(deltaDiff) > 2 || deltaX === 0 || deltaY === 0) {
        // north
        if (deltaX > 0 && Math.abs(deltaX) >= Math.abs(deltaY)) {
          newPlayer.col += Math.min(deltaX, 2);
        }
        // south
        else if (deltaX < 0 && Math.abs(deltaX) >= Math.abs(deltaY)) {
          newPlayer.col += Math.max(deltaX, -2);
        }
        // east
        else if (deltaY > 0) {
          newPlayer.row += Math.min(deltaY, 2);
        }
        // west
        else if (deltaY < 0) {
          newPlayer.row += Math.max(deltaY, -2);
        }
      }
      // diagonal
      else {
        // northeast
        if (deltaX > 0 && deltaY > 0) {
          newPlayer.col += Math.min(deltaX, 2);
          newPlayer.row += Math.min(deltaY, 2);
        }
        // northwest
        if (deltaX > 0 && deltaY < 0) {
          newPlayer.col += Math.min(deltaX, 2);
          newPlayer.row += Math.max(deltaY, -2);
        }
        // southeast
        if (deltaX < 0 && deltaY > 0) {
          newPlayer.col += Math.max(deltaX, -2);
          newPlayer.row += Math.min(deltaY, 2);
        }
        // southwest
        if (deltaX < 0 && deltaY < 0) {
          newPlayer.col += Math.max(deltaX, -2);
          newPlayer.row += Math.max(deltaY, -2);
        }
      }
    }
    // correct for walls after cause lazy
    if (newPlayer.row < 1) {
      newPlayer.row = 1;
    }
    if (newPlayer.col < 1) {
      newPlayer.col = 1;
    }
    if (newPlayer.col > 19) {
      newPlayer.col = 19;
    }
    if (newPlayer.row > 13) {
      newPlayer.row = 13;
    }
  }

  const generateGraardorArea = (graardor: Graardor) => ({
    x1: graardor.col,
    x2: graardor.col + 3,
    y1: graardor.row,
    y2: graardor.row + 3,
  });

  const isPlayerUnderGraardor = (player: Player, graardor: Graardor) => {
    const graardorArea = generateGraardorArea(graardor);
    return (
      player.col >= graardorArea.x1 &&
      player.col <= graardorArea.x2 &&
      player.row >= graardorArea.y1 &&
      player.row <= graardorArea.y2
    );
  };

  const playerUnderGraardor = isPlayerUnderGraardor(player, graardor);

  // shoot
  if (
    playerAction.action === "attacking" &&
    player.attackTimer <= 1 &&
    !playerUnderGraardor
  ) {
    newPlayer.attackTimer = 4;
    if (Math.random() >= 0.4) {
      const dmg = Math.floor(Math.random() * 44);
      if (dmg >= graardor.hp) {
        newAction = { action: "idle" };
      }
      newGraardor = {
        ...newGraardor,
        damage: Math.min(newGraardor.hp, dmg),
        hp: Math.max(0, newGraardor.hp - dmg),
      };
    } else {
      newGraardor.damage = 0;
    }
    if (shootSoundRef?.current) {
      shootSoundRef.current.currentTime = 0.4;
      shootSoundRef.current.play();
    }
  } else if (playerAction.action === "attacking" && playerUnderGraardor) {
    console.log("moving player cause under");
    const playerVsGraardorX = player.col - graardor.col;
    const playerVsGraardorY = player.row - graardor.row;
    switch (playerVsGraardorX) {
      case 0:
        newPlayer.col -= 1;
        break;
      case 1:
        newPlayer.col -= 2;
        break;
      case 2:
        newPlayer.col += 2;
        break;
      case 3:
        newPlayer.col += 1;
        break;
    }
    switch (playerVsGraardorY) {
      case 0:
        if (playerVsGraardorX === 1 || playerVsGraardorX === 2) {
          newPlayer.row -= 1;
        }
        break;
      case 1:
        newPlayer.row -= 2;
        break;
      case 2:
        newPlayer.row += 2;
        break;
      case 3:
        if (playerVsGraardorX === 1 || playerVsGraardorX === 2) {
          newPlayer.row += 1;
        }
        break;
    }
  }

  // graardor action

  const isPlayerNextToGraardor = (player: Player, graardor: Graardor) => {
    const graardorArea = generateGraardorArea(graardor);
    const playerUnderGraardor = isPlayerUnderGraardor(player, graardor);

    return (
      !playerUnderGraardor &&
      // in hitbox
      player.col >= graardorArea.x1 - 1 &&
      player.col <= graardorArea.x2 + 1 &&
      player.row >= graardorArea.y1 - 1 &&
      player.row <= graardorArea.y2 + 1 &&
      // not corners
      // tl
      !(
        player.col === graardorArea.x1 - 1 && player.row === graardorArea.y1 - 1
      ) &&
      // tr
      !(
        player.col === graardorArea.x2 + 1 && player.row === graardorArea.y1 - 1
      ) &&
      // bl
      !(
        player.col === graardorArea.x1 - 1 && player.row === graardorArea.y2 + 1
      ) &&
      // br
      !(
        player.col === graardorArea.x2 + 1 && player.row === graardorArea.y2 + 1
      )
    );
  };

  const playerNextToGraardor = isPlayerNextToGraardor(player, graardor);

  if (playerUnderGraardor) {
    newAction.location = "under graardor";
  } else if (playerNextToGraardor) {
    newAction.location = "next to graardor";
  } else {
    newAction.location = "";
  }

  if (graardor.respawnTimer === -1) {
    if (playerNextToGraardor) {
      if (
        !(
          playerAction.target
          // &&
          // (playerAction.action === "attacking" ||
          // playerAction.action === "moving")
        ) &&
        graardor.attackTimer === 0
      ) {
        console.log("BONK");
        if (punchSoundRef?.current) {
          punchSoundRef.current.currentTime = 0.6;
          punchSoundRef.current.play();
        }
        newGraardor.attackTimer = 5;
        if (Math.random() > 0.33) {
          const dmg = Math.floor(Math.random() * 60);
          newPlayer.damage = Math.min(player.hp, dmg);
          newPlayer.hp = Math.max(0, player.hp - dmg);
        } else {
          newPlayer.damage = 0;
        }
      }
    } else if (playerUnderGraardor) {
      if (!newAction.target) {
        console.log("moving graardor cause under");
        const playerVsGraardorX = player.col - graardor.col;
        const playerVsGraardorY = player.row - graardor.row;
        switch (playerVsGraardorX) {
          case 0:
          case 1:
            newGraardor.col += 1;
            break;
          case 2:
          case 3:
            newGraardor.col -= 1;
            break;
        }
        switch (playerVsGraardorY) {
          case 0:
            if (playerVsGraardorX === 1 || playerVsGraardorX === 2) {
              newGraardor.row += 1;
            }
            break;
          case 1:
            newGraardor.row += 1;
            break;
          case 2:
            newGraardor.row -= 1;
            break;
          case 3:
            if (playerVsGraardorX === 1 || playerVsGraardorX === 2) {
              newGraardor.row -= 1;
            }
            break;
        }
      }
    } else {
      const deltaX = player.col - graardor.col;
      const deltaY = player.row - graardor.row;
      newGraardor.row += deltaY > 0 ? 1 : deltaY < 0 ? -1 : 0;
      newGraardor.col += deltaX > 0 ? 1 : deltaX < 0 ? -1 : 0;
      if (
        isPlayerNextToGraardor(player, newGraardor) &&
        newGraardor.attackTimer === 0 &&
        newGraardor.hp > 0
      ) {
        if (punchSoundRef?.current) {
          punchSoundRef.current.currentTime = 0.6;
          punchSoundRef.current.play();
        }
        newGraardor.attackTimer = 5;
        if (Math.random() > 0.33) {
          const dmg = Math.floor(Math.random() * 60);
          newPlayer.damage = Math.min(player.hp, dmg);
          newPlayer.hp = Math.max(0, player.hp - dmg);
        } else {
          newPlayer.damage = 0;
        }
      }
    }
  }

  // correct for walls after cause lazy
  if (newGraardor.row < 1) {
    newGraardor.row = 1;
  }
  if (newGraardor.col < 1) {
    newGraardor.col = 1;
  }
  if (newGraardor.col > 16) {
    newGraardor.col = 16;
  }
  if (newGraardor.row > 10) {
    newGraardor.row = 10;
  }

  // update displayed hp
  if (graardor.displayedHp !== graardor.hp) {
    newGraardor.displayedHp = graardor.hp;
  }

  if (playerAction.target === "clear me") {
    newAction.target = "";
  }

  // clear target after  attacking
  if (
    playerAction.action === "attacking" &&
    (playerAction.target === "door" || playerAction.target === "altar") &&
    player.attackTimer === 3
  ) {
    newAction.target = "";
  }

  setPlayer({ ...newPlayer });
  setGraardor({ ...newGraardor });
  setPlayerAction({ ...newAction });
};
