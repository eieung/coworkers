import { twMerge } from 'tailwind-merge';

/*
 * @component
 * Button - 각 페이지의 버튼을 모아놓은 컴포넌트.
 *
 * @props
 * - appearance (optional): 각 버튼의 기본 베이스 스타일을 적용합니다.
 * - fullWidth (optional): 버튼의 width를 적용합니다.
 * - size (optional): 버튼의 height를 적용합니다.
 * - disabled(optional): 버튼의 활성화를 선택합니다.
 * - children: 버튼 안의 텍스트를 입력합니다.
 * - className (optional): 버튼에 추가적인 클래스명을 적용할 수 있습니다.
 * - font (optional): 버튼 안의 텍스트를 스타일링 합니다.
 *
 * @usage
 * 1. 버튼 입력 필드:
 *    <Button
 *      size = "large"
 *      font="font-bold-24"
 *      appearance="solid"
 *      fullWidth={true}
 *      children="생성하기"
 *      className=""
 *      disabled={false}
 *    />
 */

const itemVariants = {
  solid:
    'rounded-[12px] bg-brand-primary text-white hover:bg-it-hover active:bg-it-pressed disabled:bg-it-inactive',
  outlined:
    'rounded-[12px] border border-solid border-brand-primary bg-white text-brand-primary hover:border-it-hover hover:text-it-hover active:border-it-pressed active:text-it-pressed disabled:border-it-inactive disabled:text-it-inactive',
  'secondary-outlined':
    'rounded-[12px] border border-solid border-text-secondary bg-white text-text-default',
  danger: 'rounded-[12px] bg-status-danger text-white',
  'floating-solid':
    'rounded-[40px] bg-brand-primary text-white shadow-floating hover:bg-it-hover active:bg-it-pressed disabled:bg-it-inactive',
  'floating-outlined':
    'rounded-[40px] border-1 border-solid border-brand-primary bg-bg-inverse text-brand-primary shadow-floating hover:border-it-hover hover:text-it-hover active:border-it-pressed active:text-it-pressed disabled:border-it-inactive disabled:text-it-inactive',
} as const;

export type ButtonVariant = keyof typeof itemVariants;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: ButtonVariant;
  fullWidth?: boolean;
  size?: 'large' | 'xsmall' | 'floating-large' | 'floating-medium';
  disabled?: boolean;
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
      className={twMerge(
        fullWidth && 'w-full',
        !fullWidth &&
          size !== 'floating-large' &&
          size !== 'floating-medium' &&
          'px-3',
        size === 'large' && 'h-12',
        size === 'xsmall' && 'h-8',
        size === 'floating-large' && 'h-12 px-[21px]',
        size === 'floating-medium' && 'h-10 px-[21px]',
        itemVariants[appearance],
        font && fontClass(font),
        className,
      )}
    >
      {children}
    </button>
  );
}
