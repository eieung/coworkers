import Input from '../common/Input';
import { useValidation } from '@/hooks/useValidation';
import Button from '../common/button';
import axios from 'axios';
import { useRouter } from 'next/router';
import { publicAxiosInstance } from '@/services/axios';

export default function SignUpForm() {
  const {
    email,
    password,
    nickname,
    confirmPassword,
    setServerError,
    clearServerError,
  } = useValidation();
  const router = useRouter();

  const isFormValid =
    email.isValid &&
    password.isValid &&
    nickname.isValid &&
    confirmPassword.isValid &&
    email.value !== '' &&
    password.value !== '' &&
    nickname.value !== '' &&
    confirmPassword.value !== '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearServerError();
    const signupData = {
      email: email.value,
      nickname: nickname.value,
      password: password.value,
      passwordConfirmation: confirmPassword.value,
    };
    try {
      const response = await publicAxiosInstance.post(
        '/auth/signup',
        signupData,
      );

      if (response.status === 201) {
        router.push('/login');
      } else {
        console.log('회원가입에 실패했습니다.');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        if (data.details) {
          if (data.details.email) {
            setServerError('email', data.details.email.message);
          }
          if (data.details.nickname) {
            setServerError('nickname', data.details.nickname.message);
          }
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:mb-49 mb-[25px] flex w-full flex-col gap-10 lg:mb-12"
    >
      <div>
        <div className="flex flex-col gap-6">
          <Input
            label="이름"
            type="text"
            value={nickname.value}
            onChange={nickname.handleChange}
            onBlur={nickname.handleBlur}
            invalid={!nickname.isValid}
            validationMessage={nickname.getMessage()}
            placeholder="이름을 입력해 주세요."
            className="h-11 w-full"
          />
          <Input
            label="이메일"
            type="email"
            value={email.value}
            onChange={email.handleChange}
            onBlur={email.handleBlur}
            invalid={!email.isValid}
            validationMessage={email.getMessage()}
            placeholder="이메일을 입력하세요."
            className="h-11 w-full"
          />
          <Input
            label="비밀번호"
            type="password"
            value={password.value}
            onChange={password.handleChange}
            onBlur={password.handleBlur}
            invalid={!password.isValid}
            validationMessage={password.getMessage()}
            placeholder="비밀번호를 입력해주세요."
            className="h-11 w-full"
          />
          <Input
            label="비밀번호 확인"
            type="password"
            value={confirmPassword.value}
            onChange={confirmPassword.handleChange}
            onBlur={confirmPassword.handleBlur}
            invalid={!confirmPassword.isValid}
            validationMessage={confirmPassword.getMessage()}
            placeholder="비밀번호를 다시 한 번 입력해 주세요."
            className="h-11 w-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <Button
          size="large"
          font="font-16-semibold-16"
          appearance="solid"
          fullWidth={true}
          children="회원가입"
          disabled={!isFormValid}
        />
      </div>
    </form>
  );
}
