import Image from 'next/image';
import notFound from '@/assets/image/icon/notFound.svg';
import Button from '@/components/common/button';
import { useRouter } from 'next/router';

export default function NotFound() {
  const router = useRouter();

  const handleLandingClick = () => {
    router.push('/');
  };

  return (
    <div className="m-auto mt-[80px] flex flex-col items-center justify-center md:mt-[80px] lg:mt-[120px]">
      <Image
        src={notFound}
        alt="소속된 팀이 없습니다."
        width={206}
        height={206}
        className="md:w-[412px] lg:w-[412px]"
      />
      <div className="flex flex-col items-center gap-y-2">
        <p className="font-bold-20 text-text-default">
          페이지를 찾을 수 없어요.
        </p>
        <p className="font-bold-20 text-text-default">
          팀을 생성하거나 팀에 참여해보세요.
        </p>
      </div>
      <div className="mt-12 flex w-[186px] flex-col gap-y-2 md:mt-16 lg:mt-10">
        <Button
          size="large"
          font="font-semibold-14"
          appearance="solid"
          children="메인으로 이동하기"
          fullWidth={true}
          onClick={handleLandingClick}
        />
      </div>
    </div>
  );
}
