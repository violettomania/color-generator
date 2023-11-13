import { useState, useEffect } from 'react';
import { ColorUtil, RGBColor } from '../utils/colorUtil';

type ColorPair = { rgb: RGBColor; hex: string };

export default function App() {
  const [color, setColor] = useState('#f15025');
  const [colorPairs, setHues] = useState<ColorPair[]>([]);

  const generateColorPairs = (color: string) => {
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
      setHues(colorPairs);
    }
  };

  useEffect(() => {
    generateColorPairs(color);
  }, [color]);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    generateColorPairs(color);
  };

  return (
    <main>
      <section className='container'>
        <h4>color generator</h4>
        <form className='color-form'>
          <input type='color' value={color} onChange={() => {}} />
          <input
            type='text'
            placeholder={color}
            value={color}
            onChange={() => {}}
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
      <div className='Toastify'></div>
    </main>
  );
}
