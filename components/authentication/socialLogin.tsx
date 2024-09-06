import kakaotalk from '@/assets/image/social/kakaotalk.svg';
import google from '@/assets/image/social/google.svg';
import Image from 'next/image';

export default function SocialLogin() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="relative flex items-center gap-6">
        <div className="flex-grow border-t border-bd-primary"></div>
        <span className="font-medium-16 text-white">OR</span>
        <div className="flex-grow border-t border-bd-primary"></div>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-medium-16 text-white">간편 로그인하기</span>
        <div className="flex justify-between gap-4">
          <button>
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
