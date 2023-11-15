import Color from './Color';

interface ColorsProps {
  lightColorPairs: ColorPair[];
  darkColorPairs: ColorPair[];
  onCopy: (hex: string) => void;
}

export default function Colors({
  lightColorPairs,
  darkColorPairs,
  onCopy,
}: ColorsProps) {
  return (
    <section className='colors'>
      {lightColorPairs
        .map((colorPair, index) => (
          <Color
            key={colorPair.hex}
            {...{
              className: '',
              percent: index * 10,
              onCopy,
              ...colorPair,
            }}
          />
        ))
        .reverse()}
      {darkColorPairs.map((colorPair, index) => (
        <Color
          key={colorPair.hex}
          {...{
            className: 'color-light',
            percent: (index + 1) * 10,
            onCopy,
            ...colorPair,
          }}
        />
      ))}
    </section>
  );
}
