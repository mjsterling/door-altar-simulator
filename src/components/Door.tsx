import { useGameState } from "../providers/GameStateProvider";

export const Door = () => {
  const { playerAction, setPlayerAction } = useGameState();
  return (
    <rect
      x="400"
      y="0"
      width="100"
      height="100"
      stroke={playerAction.target === "door" ? "red" : "orange"}
      strokeWidth="5"
      fill="#777"
      className="cursor-pointer"
      onClick={() => {
        setPlayerAction({
          action: "moving",
          row: 0,
          col: 4,
          target: "door",
        });
      }}
    />
  );
};
