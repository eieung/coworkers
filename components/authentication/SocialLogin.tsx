import kakaotalk from '@/assets/image/social/kakaotalk.svg';
import google from '@/assets/image/social/google.svg';
import Image from 'next/image';

export default function SocialLogin() {
  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const GOOGLE_REST_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  const kakaoLink = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;
  const googleLink = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_REST_API_KEY}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

  const kakaoHandleSubmit = () => {
    window.location.href = kakaoLink;
  };
  const googleHandleSubmit = () => {
    window.location.href = googleLink;
  };

  return (
    <div className="mb-[235px] flex w-full flex-col gap-4 md:mb-[391px] lg:mb-[279px]">
      <div className="relative flex items-center gap-6">
        <div className="flex-grow border-t border-bd-primary"></div>
        <span className="font-medium-16 text-white">OR</span>
        <div className="flex-grow border-t border-bd-primary"></div>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-medium-16 text-white">간편 로그인하기</span>
        <div className="flex justify-between gap-4">
          <button onClick={kakaoHandleSubmit}>
            <Image src={kakaotalk} alt="카카오 로그인" />
          </button>
          <button onClick={googleHandleSubmit}>
            <Image src={google} alt="구글 로그인" />
          </button>
        </div>
      </div>
    </div>
  );
}
