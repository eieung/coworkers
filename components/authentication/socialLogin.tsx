import kakaotalk from '@/assets/image/social/kakaotalk.svg';
import google from '@/assets/image/social/google.svg';
import Image from 'next/image';

export default function SocialLogin() {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const link = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const kakaoHandleSubmit = () => {
    window.location.href = link;
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
          <button>
            <Image src={google} alt="구글 로그인" />
          </button>
        </div>
      </div>
    </div>
  );
}
