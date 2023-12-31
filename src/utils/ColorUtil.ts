type RGBColor = { r: number; g: number; b: number };

export const initialColor = '#f15025';

const componentToHex = (c: number) => {
  let hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

const rgbToHex = (color: RGBColor) => {
  return (
    '#' +
    componentToHex(color.r) +
    componentToHex(color.g) +
    componentToHex(color.b)
  );
};

export const isValidHexColor = (hex: string): boolean => {
  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(hex);
};

const hexToRgb = (hex: string): RGBColor | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const darkenColor = (color: RGBColor, factor: number): RGBColor => {
  return {
    r: Math.max(0, Math.floor(color.r * (1 - factor))),
    g: Math.max(0, Math.floor(color.g * (1 - factor))),
    b: Math.max(0, Math.floor(color.b * (1 - factor))),
  };
};

const lightenColor = (color: RGBColor, factor: number): RGBColor => {
  return {
    r: Math.min(255, Math.floor(color.r + (255 - color.r) * factor)),
    g: Math.min(255, Math.floor(color.g + (255 - color.g) * factor)),
    b: Math.min(255, Math.floor(color.b + (255 - color.b) * factor)),
  };
};

const generateColorPairs = (
  color: string,
  callback: (rgb: RGBColor, factor: number) => RGBColor,
  includeOriginal = false
): ColorPair[] => {
  const colorPairs: ColorPair[] = [];
  const rgb = hexToRgb(color);

  if (rgb) {
    if (includeOriginal) {
      const originalColorPair = { rgb, hex: rgbToHex(rgb) };
      colorPairs.push(originalColorPair);
    }

    let factor = 0.1;

    for (let i = 0; i < 10; i++) {
      factor = parseFloat(factor.toFixed(2));
      colorPairs.push({
        rgb: callback(rgb, factor),
        hex: rgbToHex(callback(rgb, factor)),
      });
      factor += 0.1;
    }
  }

  return colorPairs;
};

export const generateLightColorPairs = (color: string): ColorPair[] => {
  return generateColorPairs(color, lightenColor, true);
};

export const generateDarkColorPairs = (color: string): ColorPair[] => {
  return generateColorPairs(color, darkenColor);
};
