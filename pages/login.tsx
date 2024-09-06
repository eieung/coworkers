import LoginForm from '@/components/authentication/loginForm';
import SocialLogin from '@/components/authentication/socialLogin';

export default function Login() {
  return (
    <div className="flex-center mx-auto mt-[84px] w-[343px] flex-col gap-[24px]">
      <h2 className="font-bold-24 text-text-primary">로그인</h2>
      <LoginForm />
      <SocialLogin />
    </div>
  );
}
