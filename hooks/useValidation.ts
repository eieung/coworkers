// useValidation.ts
import { useCallback, useState } from 'react';

export const useValidation = () => {
  // 이메일 상태 및 유효성 검사 상태
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  // 패스워드 상태 및 유효성 검사 상태
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  // 닉네임 상태 및 유효성 검사 상태
  const [nickname, setNickname] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(true);

  //비밀번호 확인 상태 및 유효성 검사 상태
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  //서버 에러 메시지 상태
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  //서버 에러 설정 함수
  const setServerError = (field: string, message: string) => {
    setServerErrors((prev) => ({ ...prev, [field]: message }));
  };

  //서버 에러 초기화 함수
  const clearServerError = useCallback((field: string) => {
    setServerErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  /**
   * 이메일 입력 필드의 값이 변경될 때 호출됩니다.
   * @param e - 입력 이벤트 객체
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    clearServerError('email');
    setIsEmailValid(true);
  };

  /**
   * 이메일 입력 필드의 포커스가 아웃될 때 호출됩니다.
   * 이메일이 비어있는 경우, 유효성을 false로 설정합니다.
   * @param e - 포커스 아웃 이벤트 객체
   */
  const handleEmailBlur = () => {
    if (email === '') {
      setIsEmailValid(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const getEmailValidationMessage = () => {
    if (serverErrors.email) {
      return serverErrors.email;
    }
    if (email === '') {
      return '이메일을 입력해 주세요.';
    }
    if (!isEmailValid) {
      return '유효하지 않은 이메일 형식입니다.';
    }
    return '';
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

  /**
   * 닉네임 입력 값이 변경될 때 호출됩니다.
   * @param e - 입력 이벤트 객체
   */
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    clearServerError('nickname');
    setIsNicknameValid(true);
  };

  /**
   * 닉네임 입력 필드의 포커스가 아웃될 때 호출됩니다.
   * 닉네임이 비어있는 경우, 유효성을 false로 설정합니다.
   * @param e - 포커스 아웃 이벤트 객체
   */
  const handleNicknameBlur = () => {
    if (nickname === '') {
      setIsNicknameValid(false);
      return;
    }
    if (nickname.length > 20) {
      setIsNicknameValid(false);
      return;
    }
    return setIsNicknameValid(true);
  };

  /**
   * 닉네임 유효성 검사 메시지를 반환합니다.
   * 닉네임이 비어있으면 '닉네임을 입력해주세요.' 메시지를 반환하고,
   * 닉네임이 20글자가 초과할 경우 관련된 경고 메시지를 반환합니다.
   * @returns 닉네임 유효성 검사 메시지
   */
  const getNicknameValidationMessage = () => {
    if (serverErrors.nickname) {
      return serverErrors.nickname;
    }
    if (nickname === '') {
      return '닉네임을 입력해 주세요.';
    }
    if (nickname.length > 20) {
      return '닉네임은 20글자를 초과할 수 없습니다.';
    }
    return '';
  };

  /**
   * 비밀번호 확인 입력 값이 변경될 때 호출됩니다.
   * @param e - 입력 이벤트 객체
   */
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleConfirmPasswordBlur = () => {
    if (confirmPassword === '') {
      setIsConfirmPasswordValid(false);
      return;
    } else if (password !== confirmPassword) {
      setIsConfirmPasswordValid(false);
      return;
    }
    return setIsConfirmPasswordValid(true);
  };

  /**
   * 비밀번호 확인 유효성 검사 메시지를 반환합니다.
   * 비밀번호 확인이 비어있으면 '비밀번호 확인을 입력해 주세요.' 메시지를 반환하고,
   * 비밀번호화 비밀번호 확인 값이 일치하지 않는 경우 관련된 경고 메시지를 반환합니다.
   * @returns 비밀번호 확인 유효성 검사 메시지
   */
  const getConfirmPasswordValidationMessage = () => {
    if (confirmPassword === '') {
      return '비밀번호 확인을 입력해 주세요.';
    } else if (password !== confirmPassword) {
      return '비밀번호가 일치하지 않습니다.';
    }
  };

  return {
    email: {
      value: email,
      isValid: isEmailValid && !serverErrors.email,
      handleChange: handleEmailChange,
      handleBlur: handleEmailBlur,
      getMessage: getEmailValidationMessage,
    },
    password: {
      value: password,
      isValid: isPasswordValid,
      handleChange: handlePasswordChange,
      handleBlur: handlePasswordBlur,
      getMessage: getPasswordValidationMessage,
    },
    nickname: {
      value: nickname,
      isValid: isNicknameValid && !serverErrors.nickname,
      handleChange: handleNicknameChange,
      handleBlur: handleNicknameBlur,
      getMessage: getNicknameValidationMessage,
    },

    confirmPassword: {
      value: confirmPassword,
      isValid: isConfirmPasswordValid,
      handleChange: handleConfirmPasswordChange,
      handleBlur: handleConfirmPasswordBlur,
      getMessage: getConfirmPasswordValidationMessage,
    },

    setServerError,
    clearServerError: () => setServerErrors({}),
  };
};
