interface ButtonProps {
  title: string;
  items: keyof typeof itemVariants;
  fullWidth: boolean;
  height?: number;
  font?: string;
  onClick?: () => void;
}

const itemVariants = {
  largeGreen:
    'flex-center rounded-12 bg-brand-primary text-text-inverse hover:bg-it-hover active:bg-it-pressed',
  largeWhite:
    'flex-center rounded-12 bg-white text-brand-primary border-1 border-solid border-brand-primary hover:border-it-hover hover:text-it-hover active:border-it-pressed active:text-it-pressed',
  largeWhiteSecond:
    'flex-center rounded-12 bg-white text-text-default border-1 border-solid border-text-secondary',
  largeWhiteSecondDanger:
    'flex-center rounded-12 bg-status-danger text-text-inverse',
  smallGreen:
    'flex-center rounded-12 bg-brand-primary text-white hover:bg-it-hover active:bg-it-pressed',
  smallNoneBg:
    'flex-center rounded-12 text-brand-primary border-1 border-solid border-brand-primary hover:border-it-hover hover:text-it-hover active:border-it-pressed active:text-it-pressed',
  floatingGreen:
    'flex-center rounded-40 bg-brand-primary text-white shadow-floating hover:bg-it-hover active:bg-it-pressed',
  floatingWhite:
    'flex-center rounded-40 bg-bg-inverse text-brand-primary borer-1 border-solide border-brand-primary shadow-floating hover:border-it-hover hover:text-it-hover active:border-it-pressed active:text-it-pressed',
};

const heightClass = (height: number) => `h-${height}`;
const fontClass = (font: string) => font;

export default function Button(props: ButtonProps) {
  const { title, items, fullWidth, height, font, onClick } = props;

  return (
    <button
      className={`${itemVariants[items]} ${fullWidth ? 'w-full' : ''} ${height ? heightClass(height) : ''} ${font ? fontClass(font) : ''}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
