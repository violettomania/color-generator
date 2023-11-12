import { useState } from 'react';
import { ColorUtil, RGBColor } from '../utils/colorUtil';

export default function App() {
  const [color, setColor] = useState('#f15025');
  const [hues, setHues] = useState<RGBColor[]>([]);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const rgb = ColorUtil.hexToRgb(color);
    const hues = [];
    let factor = 10;

    // TODO: use a map: {rgb:hex}
    // TODO: move to a util file

    if (rgb) {
      for (let i = 0; i < 10; i++) {
        hues.push(ColorUtil.lightenColor(rgb, factor));
        factor += 10;
      }
      setHues(hues);
    }
  };

  return (
    <main>
      <section className='container'>
        <h4>color generator</h4>
        <form className='color-form'>
          <input type='color' value='#eed7d1' onChange={() => {}} />
          <input
            type='text'
            placeholder='#f15025'
            value='#eed7d1'
            onChange={() => {}}
          />
          <button
            className='btn'
            type='submit'
            style={{ background: 'rgb(238, 215, 209)' }}
            onClick={handleSubmit}
          >
            submit
          </button>
        </form>
      </section>
      <section className='colors'>
        {hues.map((hue, index) => (
          <article
            key={hue.r + index}
            className='color color-light'
            style={{ backgroundColor: `rgb(${hue.r}), ${hue.g}), ${hue.b})` }}
          >
            <p className='percent-value'>{index * 10}</p>
            <p className='color-value'>#ffffff</p>
          </article>
        ))}
      </section>
      <div className='Toastify'></div>
    </main>
  );
}
