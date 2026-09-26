import { countHaimDisplayLines } from '@/utils/haimWysiwygLineNumberSettings';

type HaimLineNumberGutterProps = {
  text: string;
  className?: string;
};

/**
 * Non-interactive line-number column. Visibility is gated by
 * `html[data-haim-*-line-numbers]` CSS (see preview-tokens.css).
 */
export default function HaimLineNumberGutter({
  text,
  className,
}: HaimLineNumberGutterProps) {
  const count = countHaimDisplayLines(text);
  return (
    <div
      className={['haim-line-numbers', className].filter(Boolean).join(' ')}
      aria-hidden
    >
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="haim-line-numbers__n">
          {i + 1}
        </span>
      ))}
    </div>
  );
}
