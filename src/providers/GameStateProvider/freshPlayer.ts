export const freshPlayer: () => Player = () => ({
  row: 1,
  col: 4,
  hp: 99,
  damage: 0,
  attackTimer: 0,
  respawnTimer: -1,
  prayer: "none",
});
