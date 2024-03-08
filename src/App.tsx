import {
  Graardor,
  Player,
  Grid,
  CountdownOverlay,
  Altar,
  Door,
  ActionText,
} from "./components";
import { Menu } from "./components/Menu";
import { AudioProvider } from "./providers/AudioProvider";
import { GameStateProvider, useGameState } from "./providers/GameStateProvider";

const App = () => (
  <AudioProvider>
    <GameStateProvider>
      <Main />
    </GameStateProvider>
  </AudioProvider>
);

function Main() {
  const { player, setZoom, viewBox } = useGameState();
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <CountdownOverlay />
      <svg
        viewBox={viewBox}
        className="border border-black m-auto max-h-full max-w-full"
        onWheel={(e) => {
          if (e.deltaY < 0) {
            setZoom((z) => z - 0.3);
          } else if (e.deltaY > 0) {
            setZoom((z) => z + 0.3);
          }
        }}
      >
        <g
          style={{
            transition: "transform 600ms linear",
            transform: `translate(${1500 + player.col * -100}px, ${
              1000 + player.row * -100
            }px)`,
          }}
        >
          <Grid />
          <Door />
          <Altar />
          <ActionText />
          <Graardor />
          <Player />
        </g>
      </svg>
      <Menu />
    </div>
  );
}

export default App;
