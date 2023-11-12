function componentToHex(c: number) {
  let hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

type RGBColor = { r: number; g: number; b: number };

function darkenColor(color: RGBColor, factor: number): RGBColor {
  return {
    r: Math.max(0, Math.floor(color.r * (1 - factor))),
    g: Math.max(0, Math.floor(color.g * (1 - factor))),
    b: Math.max(0, Math.floor(color.b * (1 - factor))),
  };
}

function lightenColor(color: RGBColor, factor: number): RGBColor {
  return {
    r: Math.min(255, Math.floor(color.r + (255 - color.r) * factor)),
    g: Math.min(255, Math.floor(color.g + (255 - color.g) * factor)),
    b: Math.min(255, Math.floor(color.b + (255 - color.b) * factor)),
  };
}

export const ColorUtil = {
  rgbToHex,
  darkenColor,
  lightenColor,
};
