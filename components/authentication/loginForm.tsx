import Input from '../common/Input';
import { useValidation } from '@/hooks/useValidation';
import Button from '../common/button';
import Link from 'next/link';
import { useUserStore } from '@/store/authStore';

import instance from '@/libs/axios';
import { useRouter } from 'next/router';

export default function LoginForm() {
  const { email, password } = useValidation();
  const { setUser, setTokens } = useUserStore();
  const router = useRouter();

  const isFormValid =
    email.isValid &&
    password.isValid &&
    email.value !== '' &&
    password.value !== '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData = {
      email: email.value,
      password: password.value,
    };

    try {
      const response = await instance.post('/auth/signin', loginData);
      if (response.status === 200) {
        const { accessToken, refreshToken, user } = response.data;
        setTokens(accessToken, refreshToken);
        setUser(user);
        router.push('/');
      }
    } catch (error) {
      console.error('로그인에 실패했습니다.', error);
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
          <div className="flex justify-end text-emerald-500">
            비밀번호를 잊으셨나요?
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <Button
          size="large"
          font="font-16-semibold-16"
          appearance="solid"
          fullWidth={true}
          children="로그인"
          disabled={!isFormValid}
        />
        <div className="flex-center justify-between gap-3">
          <span className="font-medium-16 text-text-primary">
            아직 계정이 없으신가요?
          </span>

          <Link href="/signup">
            <span className="font-medium-16 text-emerald-500">가입하기</span>
          </Link>
        </div>
      </div>
    </form>
  );
}
