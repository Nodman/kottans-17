export const floorStars = value => value > 999
  ? `${Math.ceil(value / 1000 * 10) / 10}k`
  : value
