import clsx from 'clsx';

// interface ButtonProps {
//   title: string;
//   items: keyof typeof itemVariants;
//   fullWidth: boolean;
//   height?: number;
//   font?: string;
//   onClick?: () => void;
// }

// const itemVariants = {
//   largeGreen:
//     'flex-center rounded-12 bg-brand-primary text-text-inverse hover:bg-it-hover active:bg-it-pressed',
//   largeWhite:
//     'flex-center rounded-12 bg-white text-brand-primary border-1 border-solid border-brand-primary hover:border-it-hover hover:text-it-hover active:border-it-pressed active:text-it-pressed',
//   largeWhiteSecond:
//     'flex-center rounded-12 bg-white text-text-default border-1 border-solid border-text-secondary',
//   largeWhiteSecondDanger:
//     'flex-center rounded-12 bg-status-danger text-text-inverse',
//   smallGreen:
//     'flex-center rounded-12 bg-brand-primary text-white hover:bg-it-hover active:bg-it-pressed',
//   smallNoneBg:
//     'flex-center rounded-12 text-brand-primary border-1 border-solid border-brand-primary hover:border-it-hover hover:text-it-hover active:border-it-pressed active:text-it-pressed',
//   floatingGreen:
//     'flex-center rounded-40 bg-brand-primary text-white shadow-floating hover:bg-it-hover active:bg-it-pressed',
//   floatingWhite:
//     'flex-center rounded-40 bg-bg-inverse text-brand-primary borer-1 border-solide border-brand-primary shadow-floating hover:border-it-hover hover:text-it-hover active:border-it-pressed active:text-it-pressed',
// };

// const heightClass = (height: number) => `h-${height}`;
// const fontClass = (font: string) => font;

// export default function Button(props: ButtonProps) {
//   const { title, items, fullWidth, height, font, onClick } = props;

//   return (
//     <button
//       // className={`${itemVariants[items]} ${fullWidth ? 'w-full' : ''} ${height ? heightClass(height) : ''} ${font ? fontClass(font) : ''}`}
//       className={clsx(
//         itemVariants[items],
//         fullWidth && 'w-full',
//         height && heightClass(height),
//         font && fontClass(font),
//       )}
//       onClick={onClick}
//     >
//       {title}
//     </button>
//   );
// }
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?:
    | 'solid'
    | 'outlined'
    | 'secondary-outlined'
    | 'danger'
    | 'floating-solid'
    | 'floating-outined';
  fullWidth?: boolean; // 가로 크기: fullWidth가 false일 때만 padding x 지정 필요
  size?: 'large' | 'xsmall' | 'floating-large' | 'floating-medium'; // 세로 크기: height 지정 필요
  children?: string;
  className?: string;
}

export default function Button({
  appearance = 'solid',
  fullWidth = false,
  size = 'large',
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        size === 'large' && 'h-48',
        size === 'xsmall' && 'h-32',
        size === 'floating-large' && 'h-48',
        size === 'floating-medium' && 'h-40',
        appearance === 'solid' &&
          'bg-primary rounded-12 text-white hover:bg-it-hover active:bg-it-pressed',
        appearance === 'outlined' &&
          'rounded-12 bg-white hover:border-it-hover hover:text-it-hover active:border-it-pressed active:text-it-pressed',
        appearance === 'secondary-outlined' && 'rounded-12 bg-white',
        appearance === 'danger' && 'rounded-12 bg-status-danger',
        appearance === 'floating-solid' && 'bg-primary rounded-40 text-white',
        appearance === 'floating-outined' &&
          'rounded-40 bg-bg-inverse text-brand-primary',

        fullWidth && 'w-full',
        !fullWidth && 'px-12',
        // "hover:bg-bgbgdfgdfgdf active:bg-dadasdas disabled:bfgdfgdf",
        className,
      )}
    >
      {children}
    </button>
  );
}
