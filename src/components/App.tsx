import { useState, useEffect } from 'react';
import {
  isValidHexColor,
  initialColor,
  generateLightColorPairs,
  generateDarkColorPairs,
} from '../utils/ColorUtil';
import { ToastContainer, toast } from 'react-toastify';
import Colors from './Colors';

export default function App() {
  const [inputColor, setInputColor] = useState(initialColor);
  const [color, setColor] = useState(initialColor);
  const [lightColorPairs, setLightColorPairs] = useState<ColorPair[]>([]);
  const [darkColorPairs, setDarkColorPairs] = useState<ColorPair[]>([]);

  useEffect(() => {
    const lightColorPairs = generateLightColorPairs(initialColor);
    const darkColorPairs = generateDarkColorPairs(initialColor);

    setLightColorPairs(lightColorPairs);
    setDarkColorPairs(darkColorPairs);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColor(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isValidHexColor(inputColor)) {
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
          <input type='color' value={inputColor} onChange={handleChange} />
          <input
            type='text'
            placeholder={color}
            value={inputColor}
            onChange={handleChange}
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
      <Colors {...{ lightColorPairs, darkColorPairs, onCopy: handleCopy }} />
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
