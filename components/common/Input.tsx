import { useState, forwardRef } from 'react';
import clsx from 'clsx';
import visibilityOn from '@/assets/image/icon/visibility_on.svg';
import visibilityOff from '@/assets/image/icon/visibility_off.svg';
import Image from 'next/image';

/*
 * @component
 * Input - 다양한 타입의 입력 필드를 처리하는 Input 컴포넌트
 *
 * @props
 * - label (optional): 입력 필드에 표시할 레이블 텍스트입니다.
 * - invalid (optional): 입력 필드가 유효하지 않은 경우 true로 설정하여 오류 스타일을 적용합니다.
 * - validationMessage (optional): 입력 필드가 유효하지 않을 때 표시할 오류 메시지입니다.
 * - className (optional): 입력 필드에 추가적인 클래스명을 적용할 수 있습니다.
 * - type (optional): 입력 필드의 타입을 설정합니다. 기본값은 'text'입니다.
 *
 * @usage
 * 1. 일반 텍스트 입력 필드:
 *    <Input
 *      label="이름"
 *      type="text"
 *      placeholder="이름을 입력하세요"
 *      className="w-full"
 *    />
 *
 * 2. 이메일 입력 필드:
 *    <Input
 *      label="이메일"
 *      type="email"
 *      placeholder="이메일을 입력하세요"
 *      className="w-full"
 *    />
 *
 * 3. 비밀번호 입력 필드:
 *    <Input
 *      label="비밀번호"
 *      type="password"
 *      placeholder="비밀번호를 입력하세요"
 *      className="w-full"
 *    />
 */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  invalid?: boolean;
  validationMessage?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, invalid, validationMessage, type = 'text', className, ...props },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <div className="inline-flex flex-col justify-start">
        {label && (
          <label
            htmlFor={props.id}
            className="font-medium-16 mb-3 inline-block text-text-primary"
          >
            {label}
          </label>
        )}
        <span className="relative">
          <input
            ref={ref}
            type={type === 'password' && isPasswordVisible ? 'text' : type}
            className={clsx(
              'placeholder:font-regular-16 rounded-[12px] border border-solid border-bd-primary bg-bg-secondary p-4 text-text-primary outline-none placeholder:text-text-default',
              'hover:border-it-hover',
              'focus:border-it-focus',
              type === 'password' ? 'pr-10' : 'pr-4',
              invalid && 'border-red-500',
              !invalid && props.value && 'border-bd-primary',
              className,
            )}
            {...props}
          />
          {type === 'password' && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-input-translate"
            >
              <Image
                src={isPasswordVisible ? visibilityOn : visibilityOff}
                alt={isPasswordVisible ? '비밀번호 표시' : '비밀번호 숨김'}
                width={24}
                height={24}
              />
            </button>
          )}
        </span>
        {invalid && validationMessage && (
          <span className="font-medium-14 mt-2 block text-red-500">
            {validationMessage}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
