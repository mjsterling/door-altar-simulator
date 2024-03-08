import { useGameState } from "../providers/GameStateProvider";

export const CountdownOverlay = () => {
  const { gameCountdown, setGameCountdown } = useGameState();
  return gameCountdown !== 0 ? (
    <div
      className="z-50 fixed left-0 top-0 w-full h-full flex justify-center items-center"
      style={{ backgroundColor: "#0007" }}
      onClick={() => {
        setGameCountdown(5);
      }}
    >
      <h1 className="text-xl text-white font-sans">
        {gameCountdown === -1 ? "Click to start" : gameCountdown}
      </h1>
    </div>
  ) : null;
};
