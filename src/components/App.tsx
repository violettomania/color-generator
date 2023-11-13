import { useState, useEffect } from 'react';
import { ColorUtil, RGBColor } from '../utils/colorUtil';
import { ToastContainer, toast } from 'react-toastify';

type ColorPair = { rgb: RGBColor; hex: string };

const generateColorPairs = (color: string): ColorPair[] => {
  const rgb = ColorUtil.hexToRgb(color);
  const colorPairs = [];
  let factor = 0.1;

  if (rgb) {
    for (let i = 0; i < 10; i++) {
      factor = parseFloat(factor.toFixed(2));
      colorPairs.push({
        rgb: ColorUtil.lightenColor(rgb, factor),
        hex: ColorUtil.rgbToHex(ColorUtil.lightenColor(rgb, factor)),
      });
      factor += 0.1;
    }
  }

  return colorPairs;
};

export default function App() {
  const [inputColor, setInputColor] = useState('#f15025');
  const [color, setColor] = useState('#f15025');
  const [colorPairs, setColorPairs] = useState<ColorPair[]>([]);

  useEffect(() => {
    const colorPairs = generateColorPairs(color);
    setColorPairs(colorPairs);
  }, [color]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColor(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!ColorUtil.isValidHexColor(inputColor)) {
      showError('Please enter a valid hex color!');
      return;
    }
    setColor(inputColor);
    const colorPairs = generateColorPairs(inputColor);
    setColorPairs(colorPairs);
  };

  const showError = (message: string) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
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
        {colorPairs.map(({ rgb, hex }, index) => {
          return (
            <article
              key={hex}
              className='color color-light'
              style={{ backgroundColor: hex }}
            >
              <p className='percent-value'>{index * 10}%</p>
              <p className='color-value'>{hex}</p>
            </article>
          );
        })}
      </section>
      <div>
        <ToastContainer position='top-center' />
      </div>
    </main>
  );
}
