const colors = [
  "var(--card-bg-color-oran)",
  "var(--card-bg-color-purp)",
  "var(--card-bg-color-blue)",
  "var(--card-bg-color-green)",
];

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
