import clsx from 'clsx';

const itemVariants = {
  solid:
    'rounded-[12px] bg-brand-primary text-white hover:bg-it-hover active:bg-it-pressed disabled:bg-it-inactive',
  outlined:
    'outlined-[1px] rounded-[12px] border-[1px] border-solid border-brand-primary bg-white text-brand-primary hover:border-it-hover hover:text-it-hover active:border-it-pressed active:text-it-pressed disabled:border-it-inactive disabled:text-it-inactive',
  'secondary-outlined':
    'rounded-[12px] border-[1px] border-solid border-text-secondary bg-white text-text-default',
  danger: 'rounded-[12px] bg-status-danger text-white',
  'floating-solid':
    'rounded-[40px] bg-brand-primary text-white hover:bg-it-hover active:bg-it-pressed disabled:bg-it-inactive',
  'floating-outlined':
    'rounded-[40px] border-1 border-solid border-brand-primary bg-bg-inverse text-brand-primary hover:border-it-hover hover:text-it-hover active:border-it-pressed active:text-it-pressed disabled:border-it-inactive disabled:text-it-inactive',
} as const;

export type ButtonVariant = keyof typeof itemVariants;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance: ButtonVariant;
  fullWidth: boolean;
  size: 'large' | 'xsmall' | 'floating-large' | 'floating-medium';
  disabled: boolean;
  children: string;
  className?: string;
  font?: string;
}

export default function Button({
  appearance = 'solid',
  fullWidth = false,
  size = 'large',
  disabled = false,
  children,
  font,
  className,
  ...rest
}: ButtonProps) {
  const fontClass = (font: string) => `${font}`;
  return (
    <button
      {...rest}
      disabled={disabled}
      className={clsx(
        fullWidth && 'w-full',
        !fullWidth && 'px-[12px]',
        size === 'large' && 'h-[48px]',
        size === 'xsmall' && 'h-[32px]',
        size === 'floating-large' && 'h-[48px] px-[21px]',
        size === 'floating-medium' && 'h-[40px] px-[21px]',
        itemVariants[appearance],
        font && fontClass(font),
        className,
      )}
    >
      {children}
    </button>
  );
}
