import { useState, useEffect } from 'react';
import { ColorUtil, RGBColor } from '../utils/colorUtil';
import { ToastContainer, toast } from 'react-toastify';

type ColorPair = { rgb: RGBColor; hex: string };

const generateColorPairs = (
  color: string,
  callback: (rgb: RGBColor, factor: number) => RGBColor,
  includeOriginal = false
): ColorPair[] => {
  const colorPairs: ColorPair[] = [];
  const rgb = ColorUtil.hexToRgb(color);
  if (rgb) {
    if (includeOriginal) {
      const originalColorPair = { rgb, hex: ColorUtil.rgbToHex(rgb) };
      colorPairs.push(originalColorPair);
    }

    let factor = 0.1;

    for (let i = 0; i < 10; i++) {
      factor = parseFloat(factor.toFixed(2));
      colorPairs.push({
        rgb: callback(rgb, factor),
        hex: ColorUtil.rgbToHex(ColorUtil.lightenColor(rgb, factor)),
      });
      factor += 0.1;
    }
  }

  return colorPairs;
};

const generateLightColorPairs = (color: string): ColorPair[] => {
  return generateColorPairs(color, ColorUtil.lightenColor, true);
};

const generateDarkColorPairs = (color: string): ColorPair[] => {
  return generateColorPairs(color, ColorUtil.darkenColor);
};

export default function App() {
  const [inputColor, setInputColor] = useState('#f15025');
  const [color, setColor] = useState('#f15025');
  const [lightColorPairs, setLightColorPairs] = useState<ColorPair[]>([]);
  const [darkColorPairs, setDarkColorPairs] = useState<ColorPair[]>([]);

  useEffect(() => {
    const lightColorPairs = generateLightColorPairs(color);
    const darkColorPairs = generateDarkColorPairs(color);

    setLightColorPairs(lightColorPairs);
    setDarkColorPairs(darkColorPairs);
  }, [color]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColor(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!ColorUtil.isValidHexColor(inputColor)) {
      toast.error('Please enter a valid hex color!');
      return;
    }
    setColor(inputColor);
    const lightColorPairs = generateLightColorPairs(inputColor);
    const darkColorPairs = generateDarkColorPairs(inputColor);

    setLightColorPairs(lightColorPairs);
    setDarkColorPairs(darkColorPairs);
  };

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast.success('Color copied to clipboard!');
  };

  return (
    <main>
      <section className='container'>
        <h4>color generator</h4>
        <form className='color-form'>
          <input type='color' value={inputColor} onChange={handleColorChange} />
          <input
            type='text'
            placeholder={color}
            value={inputColor}
            onChange={handleColorChange}
          />
          <button
            className='btn'
            type='submit'
            style={{ background: color }}
            onClick={handleSubmit}
          >
            submit
          </button>
        </form>
      </section>
      <section className='colors'>
        {lightColorPairs
          .map(({ rgb, hex }, index) => {
            return (
              <article
                key={hex}
                className='color'
                style={{ backgroundColor: hex }}
                onClick={() => handleCopy(hex)}
              >
                <p className='percent-value'>{index * 10}%</p>
                <p className='color-value'>{hex}</p>
              </article>
            );
          })
          .reverse()}
        {darkColorPairs.map(({ rgb, hex }, index) => {
          return (
            <article
              key={hex}
              className='color color-light'
              style={{ backgroundColor: hex }}
              onClick={() => handleCopy(hex)}
            >
              <p className='percent-value'>{(index + 1) * 10}%</p>
              <p className='color-value'>{hex}</p>
            </article>
          );
        })}
      </section>
      <div>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </div>
    </main>
  );
}
