import Input from '@/components/common/Input';
import Button from '@/components/common/button';
import { useValidation } from '@/hooks/useValidation';
import { publicAxiosInstance } from '@/services/axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function resetPassword() {
  const { password, confirmPassword } = useValidation();
  const router = useRouter();
  const isFormValid =
    password.isValid &&
    confirmPassword.isValid &&
    password.value !== '' &&
    confirmPassword.value !== '';

  const { token } = router.query;

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const resetPasswordData = {
      passwordConfirmation: confirmPassword.value,
      password: password.value,
      token: token,
    };
    try {
      const response = await publicAxiosInstance.patch(
        '/user/reset-password',
        resetPasswordData,
      );
      if (response.status === 200) {
        toast.success('비밀번호 재설정에 성공하였습니다!');
        router.push('/login');
      }
    } catch (error) {
      toast.error('비밀번호 재설정에 실패하였습니다.');
    }
  };

  return (
    <div className="flex-center mx-auto mt-[24px] w-[343px] flex-col md:mt-[100px] md:w-[460px] lg:mt-[140px] lg:w-[460px]">
      <h2 className="font-medium-24 mb-6 text-text-primary md:mb-20 lg:mb-20">
        비밀번호 재설정
      </h2>
      <form className="flex w-full flex-col gap-10" onSubmit={handleSubmit}>
        <div className="flex w-full flex-col gap-6">
          <Input
            label="새 비밀번호"
            type="password"
            value={password.value}
            onChange={password.handleChange}
            onBlur={password.handleBlur}
            invalid={!password.isValid}
            validationMessage={password.getMessage()}
            placeholder="비밀번호 (영문, 숫자 포함, 8자 이상)를 입력해 주세요."
            className="placeholder:font-regular-14 h-11 w-full"
          />
          <Input
            label="비밀번호 확인"
            type="password"
            value={confirmPassword.value}
            onChange={confirmPassword.handleChange}
            onBlur={confirmPassword.handleBlur}
            invalid={!confirmPassword.isValid}
            validationMessage={confirmPassword.getMessage()}
            placeholder="새 비밀번호를 다시 한 번 입력해 주세요."
            className="placeholder:font-regular-14 h-11 w-full"
          />
        </div>
        <Button
          size="large"
          appearance="solid"
          fullWidth={true}
          children="재설정"
          disabled={!isFormValid}
        />
      </form>
    </div>
  );
}
