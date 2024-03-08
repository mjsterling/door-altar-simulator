import { useGameState } from "../providers/GameStateProvider";

export const Grid = () => {
  const { playerAction, setPlayerAction } = useGameState();
  const width = 23;
  const height = 15;

  const calculateStroke = (row: number, col: number) => {
    // marked tiles
    if (playerAction.row === row && playerAction.col === col) {
      return "#FFF";
    }
    if (row === 7 && col !== 1 && col !== width - 1 && col % 3 === 1) {
      return "#FFFF00";
    }
    return "";
  };
  const calculateFill = (row: number, col: number) => {
    // door
    if (row === 0 && col >= 3 && col <= 5) {
      return "#888";
    }
    // altar
    if (col >= width - 3 && col <= width - 1 && row >= 6 && row <= 8) {
      return "#777";
    }
    if (row === 0 || row === height - 1 || col === 0 || col >= width - 3) {
      return "#333";
    }
    return "#BBB";
  };
  const calculateCursor = (row: number, col: number) => {
    // floor tiles
    if (col >= 1 && col <= width - 4 && row >= 1 && row <= height - 2) {
      return "pointer";
    }
    return "default";
  };
  return (
    <>
      {Array.from(new Array(height).keys()).map((row) => (
        <>
          {Array.from(new Array(width).keys()).map((col) => {
            const stroke = calculateStroke(row, col);

            return (
              <rect
                stroke={stroke || "none"}
                strokeWidth={stroke ? 3 : 0}
                x={col * 100}
                y={row * 100}
                width={100}
                height={100}
                fill={calculateFill(row, col)}
                style={{ cursor: calculateCursor(row, col) }}
                onClick={() => {
                  setPlayerAction((action) => ({
                    action: "moving",
                    row,
                    col,
                    target:
                      action.target === "door" || action.target === "altar"
                        ? "clear me"
                        : "",
                  }));
                }}
              />
            );
          })}
        </>
      ))}
    </>
  );
};
