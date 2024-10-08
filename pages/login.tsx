import LoginForm from '@/components/authentication/LoginForm';
import SocialLogin from '@/components/authentication/SocialLogin';

export default function Login() {
  return (
    <div className="flex-center mx-auto mt-[84px] w-[343px] flex-col gap-6 md:w-[460px] lg:w-[460px]">
      <h2 className="font-bold-24 text-text-primary">로그인</h2>
      <LoginForm />
      <SocialLogin />
    </div>
  );
}
