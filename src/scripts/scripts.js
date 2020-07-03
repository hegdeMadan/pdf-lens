import { colors } from "../theme";

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const getDefinedRandomColor = () => {
  const colorPointer = Math.floor(Math.random() * 11);
  return colors.colorCodes[colorPointer];
}

export const getColor = (name) => {
  let colorPointer = name.length;
  if (name.length > colors.colorCodes.length - 1) {
    colorPointer = colors.colorCodes.length - 1;
  }
  return colors.colorCodes[colorPointer];
}
