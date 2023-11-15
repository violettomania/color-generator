interface ColorProps {
  hex: string;
  className: string;
  percent: number;
  onCopy: (hex: string) => void;
}

export default function Color({
  hex,
  className,
  percent,
  onCopy: handleCopy,
}: ColorProps) {
  return (
    <article
      key={hex}
      className={`color ${className}`}
      style={{ backgroundColor: hex }}
      onClick={() => handleCopy(hex)}
    >
      <p className='percent-value'>{percent}%</p>
      <p className='color-value'>{hex}</p>
    </article>
  );
}
