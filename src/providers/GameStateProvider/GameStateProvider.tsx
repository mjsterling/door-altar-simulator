import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useInterval } from "../../hooks/useInterval";
import { freshGraardor, freshPlayer, freshPlayerAction, tick } from ".";
import { useAudio } from "../AudioProvider";

const GameStateContext = createContext<GameStateProps>({
  player: freshPlayer(),
  playerAction: freshPlayerAction(),
  graardor: freshGraardor(),
  setPlayer: () => {},
  setPlayerAction: () => {},
  setGraardor: () => {},
  metronomeRef: null,
  shootSoundRef: null,
  punchSoundRef: null,
  viewBox: "-500 -500 4000 3000",
  setZoom: () => {},
  gameCountdown: 5,
  setGameCountdown: () => {},
  menu: "inventory",
  setMenu: () => {},
});

export const GameStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [player, setPlayer] = useState(freshPlayer);
  const [playerAction, setPlayerAction] = useState(freshPlayerAction);
  const [graardor, setGraardor] = useState(freshGraardor);
  const [menu, setMenu] = useState<"inventory" | "prayer">("inventory");
  const { metronomeRef, shootSoundRef, punchSoundRef } = useAudio();

  const [gameCountdown, setGameCountdown] = useState(-1);

  const executeGameTick = useCallback(
    () =>
      tick(
        player,
        setPlayer,
        graardor,
        setGraardor,
        playerAction,
        setPlayerAction,
        {
          metronomeRef,
          shootSoundRef,
          punchSoundRef,
        }
      ),
    [player, graardor, playerAction, metronomeRef, shootSoundRef, punchSoundRef]
  );

  useInterval(
    gameCountdown === 0
      ? executeGameTick
      : gameCountdown === -1
      ? () => {}
      : () => {
          setGameCountdown((countdown) => countdown - 1);
        },
    600
  );

  const [zoom, setZoom] = useState(0);
  const viewBox = useMemo(
    () =>
      [
        -500 - 200 * zoom,
        -500 - 150 * zoom,
        4000 + 400 * zoom,
        3000 + 300 * zoom,
      ].join(" "),
    [zoom]
  );

  return (
    <GameStateContext.Provider
      value={{
        player,
        setPlayer,
        graardor,
        setGraardor,
        playerAction,
        setPlayerAction,
        metronomeRef,
        shootSoundRef,
        punchSoundRef,
        viewBox,
        setZoom,
        gameCountdown,
        setGameCountdown,
        menu,
        setMenu,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => useContext(GameStateContext);
