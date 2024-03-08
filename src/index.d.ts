type Player = {
  row: number;
  col: number;
  hp: number;
  damage: number;
  attackTimer: number;
  respawnTimer: number;
  prayer: "none" | "range" | "melee";
};

type PlayerAction = {
  action: "idle" | "attacking" | "moving";
  target?: "" | "door" | "altar" | "clear me";
  location?: "" | "under graardor" | "next to graardor";
  row?: number;
  col?: number;
};

type Graardor = {
  row: number;
  col: number;
  hp: number;
  displayedHp: number;
  damage: number;
  respawnTimer: number;
  attackTimer: number;
};

type GameStateProps = {
  player: Player;
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
  playerAction: PlayerAction;
  setPlayerAction: React.Dispatch<React.SetStateAction<PlayerAction>>;
  graardor: Graardor;
  setGraardor: React.Dispatch<React.SetStateAction<Graardor>>;
  metronomeRef: React.RefObject<HTMLAudioElement> | null;
  shootSoundRef: React.RefObject<HTMLAudioElement> | null;
  punchSoundRef: React.RefObject<HTMLAudioElement> | null;
  viewBox: string;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  gameCountdown: number;
  setGameCountdown: React.Dispatch<React.SetStateAction<number>>;
  menu: "inventory" | "prayer";
  setMenu: React.Dispatch<React.SetStateAction<"inventory" | "prayer">>;
};
