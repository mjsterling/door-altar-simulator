import { useGameState } from "../providers/GameStateProvider";

export const Altar = () => {
  const { playerAction, setPlayerAction } = useGameState();
  return (
    <rect
      x="2000"
      y="600"
      width="300"
      height="300"
      stroke={playerAction.target === "altar" ? "red" : "orange"}
      strokeWidth="5"
      fill="#777"
      className="cursor-pointer"
      onClick={() => {
        setPlayerAction({
          action: "moving",
          row: 7,
          col: 19,
          target: "altar",
        });
      }}
    />
  );
};
