import Input from '@/components/common/Input';
import { useState } from 'react';

export default function Example() {
  // 이메일 상태 및 유효성 검사 상태
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  // 패스워드 상태 및 유효성 검사 상태
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  /**
   * 이메일 입력 필드의 값이 변경될 때 호출됩니다.
   * @param e - 입력 이벤트 객체
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  /**
   * 이메일 입력 필드의 포커스가 아웃될 때 호출됩니다.
   * 이메일이 비어있는 경우, 유효성을 true로 설정합니다.
   * @param e - 포커스 아웃 이벤트 객체
   */
  const handleEmailBlur = () => {
    if (email === '') {
      setIsEmailValid(true);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  /**
   * 비밀번호 입력 필드의 값이 변경될 때 호출됩니다.
   * @param e - 입력 이벤트 객체
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  /**
   * 비밀번호 입력 필드의 포커스가 아웃될 때 호출됩니다.
   * 비밀번호가 비어있는 경우, 유효성을 false로 설정합니다.
   * @param e - 포커스 아웃 이벤트 객체
   */
  const handlePasswordBlur = () => {
    if (password === '') {
      setIsPasswordValid(false);
      return;
    }
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsPasswordValid(passwordRegex.test(password));
  };

  /**
   * 비밀번호 유효성 검사 메시지를 반환합니다.
   * 비밀번호가 비어있으면 '비밀번호를 입력해주세요.' 메시지를 반환하고,
   * 유효하지 않은 비밀번호일 경우 관련된 경고 메시지를 반환합니다.
   * @returns 비밀번호 유효성 검사 메시지
   */
  const getPasswordValidationMessage = () => {
    if (password === '') {
      return '비밀번호를 입력해주세요.';
    }
    if (!isPasswordValid) {
      return '비밀번호는 최소 8자 이상, 대문자, 숫자 및 특수문자를 포함해야 합니다.';
    }
    return '';
  };

  return (
    <div className="m-auto mt-5 flex h-[397px] w-[460px] flex-col gap-y-4">
      <Input
        label="이메일"
        type="email"
        value={email}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        invalid={!isEmailValid}
        validationMessage={
          !isEmailValid ? '유효하지 않은 이메일 형식입니다.' : ''
        }
        placeholder="이메일을 입력하세요."
        className="w-full"
      />
      <Input
        label="비밀번호"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
        invalid={!isPasswordValid}
        validationMessage={getPasswordValidationMessage()}
        placeholder="비밀번호를 입력하세요."
        className="w-full"
      />
    </div>
  );
}
