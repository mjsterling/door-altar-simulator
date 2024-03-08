import { useGameState } from "../providers/GameStateProvider";

export const Player = () => {
  const {
    player: { row, col, hp, attackTimer, damage },
    graardor: { attackTimer: graardorAttackTimer },
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
        <circle
          fill="purple"
          cx={50}
          cy={50}
          r={50}
          style={{ pointerEvents: "none" }}
        />
        <rect x={10} y={-15} width={80} fill="#F00" height={10} />
        <rect x={10} y={-15} fill="#0F0" height={10} width={80 * (hp / 99)} />

        {graardorAttackTimer > 3 ? (
          <g className="pointer-events-none">
            <circle
              cx={50}
              cy={50}
              r={25}
              fill={damage > 0 ? "#F00" : "#00F"}
            />
            <text
              fontSize={22}
              x={50}
              y={50}
              textAnchor="middle"
              alignmentBaseline="middle"
              stroke="white"
              fill="white"
            >
              {damage}
            </text>
          </g>
        ) : null}
        {attackTimer > 0 ? (
          <text
            x={50}
            y={25}
            fontSize={26}
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="#0FF"
            stroke="#0FF"
          >
            {attackTimer}
          </text>
        ) : null}
      </g>
      <rect
        x={x}
        y={y}
        width="100"
        height="100"
        fill="none"
        strokeWidth="3"
        stroke="#0FF"
      />
    </>
  );
};
