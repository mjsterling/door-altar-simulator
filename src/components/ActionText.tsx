import { useGameState } from "../providers/GameStateProvider";

export const ActionText = () => {
  const { player, playerAction } = useGameState();
  return (
    <text
      stroke="white"
      fill="white"
      x="1150"
      y="50"
      textAnchor="middle"
      alignmentBaseline="middle"
      fontSize={30}
      className="capitalize"
    >
      {playerAction.action}{" "}
      {playerAction.action === "moving" &&
      playerAction.col !== undefined &&
      playerAction.row !== undefined
        ? `(${playerAction.col - player.col}, ${playerAction.row - player.row})`
        : ``}
      {playerAction.location ? ` - ${playerAction.location}` : ``}
    </text>
  );
};
