import { useGameState } from "../providers/GameStateProvider";

export const Graardor = () => {
  const {
    graardor: { row, col, displayedHp, damage, attackTimer, respawnTimer },
    player: { attackTimer: playerAttackTimer },
    playerAction,
    setPlayerAction,
  } = useGameState();
  const x = col * 100;
  const y = row * 100;
  return (
    <>
      <g
        style={{
          transition: "all 600ms linear",
          transform: `translate(${x}px, ${y}px)`,
        }}
      >
        {respawnTimer <= 0 ? (
          <>
            <circle
              cx={200}
              cy={200}
              r={100}
              fill="darkgreen"
              onClick={() => {
                setPlayerAction((action) => ({
                  ...action,
                  target: action.target,
                  action: "attacking",
                }));
              }}
              className="cursor-pointer"
              stroke={
                playerAction.action === "attacking" ? "red" : "transparent"
              }
              strokeWidth="5"
            />
            <rect x={75} y={40} width={250} fill="#F00" height={20} />
            <rect
              x={75}
              y={40}
              fill="#0F0"
              height={20}
              width={250 * (displayedHp / 255)}
            />
            {playerAttackTimer > 1 && playerAttackTimer < 4 ? (
              <g className="pointer-events-none">
                <circle
                  cx={200}
                  cy={200}
                  r={25}
                  fill={damage > 0 ? "#F00" : "#00F"}
                />
                <text
                  fontSize={22}
                  x={200}
                  y={200}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  stroke="white"
                  fill="white"
                >
                  {damage}
                </text>
              </g>
            ) : null}
          </>
        ) : (
          <text
            x="200"
            y="200"
            stroke="white"
            fill="white"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={32}
          >
            {respawnTimer}
          </text>
        )}
      </g>
      <rect
        x={x}
        y={y}
        stroke="darkgreen"
        strokeWidth="4"
        width="400"
        height="400"
        fill="none"
      />
    </>
  );
};
