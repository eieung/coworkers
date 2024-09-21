import SignUpForm from '@/components/authentication/signUpForm';
import SocialLogin from '@/components/authentication/socialLogin';

export default function SignUp() {
  return (
    <div className="flex-center mx-auto mt-[84px] w-[343px] flex-col gap-6 md:w-[460px] lg:w-[460px]">
      <h2 className="font-bold-24 text-text-primary">회원가입</h2>
      <SignUpForm />
      <SocialLogin />
    </div>
  );
}
