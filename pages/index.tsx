import Button from '@/components/common/button';
import Image from 'next/image';
import landingTop from '@/assets/image/landing/landing-top-desktop.png';
import landingBottom from '@/assets/image/landing/landing-bottom-desktop.png';
import landingBottomTablet from '@/assets/image/landing/landing-bottom-tablet.png';
import landingBottomMobile from '@/assets/image/landing/landing-bottom-mobile.png';
import repair from '@/assets/image/icon/repair.svg';
import file from '@/assets/image/landing/file.svg';
import mail from '@/assets/image/landing/mail.svg';
import checkBox from '@/assets/image/landing/check.svg';
import sectionTop from '@/assets/image/landing/landing-section-top.png';
import sectionMiddle from '@/assets/image/landing/landing-section-middle.png';
import sectionBottom from '@/assets/image/landing/landing-section-bottom.png';
import { authAxiosInstance } from '@/services/axios';
import { useUserStore } from '@/store/authStore';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { GroupResponse } from '@/types/group';

export default function Home() {
  const { accessToken } = useUserStore();
  const router = useRouter();

  const startCoworkers = async () => {
    if (accessToken) {
      try {
        const response = await authAxiosInstance.get('/user/groups');
        let groups = response.data;
        const sortGroupsById = (groups: GroupResponse[]): GroupResponse[] => {
          return [...groups].sort((a, b) => a.id - b.id);
        };

        if (groups.length > 0) {
          groups = sortGroupsById(groups);
          console.log(groups);
          router.push(`/groups/${groups[0].id}`);
        } else {
          router.push('/get-started-team');
        }
      } catch (error) {
        toast.error('그룹 정보를 가져오는데 실패했습니다.');
      }
    } else if (!accessToken) {
      router.push('/login');
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center">
      <div className="relative flex h-[640px] w-full flex-col items-center overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
          <Image
            src={landingTop}
            alt="랜딩 페이지 상단 이미지"
            objectFit="cover"
            fill
            quality={100}
          />
        </div>
        <div className="mt-[55px] flex flex-col items-center gap-3">
          <div className="flex gap-[4px]">
            <span className="font-semibold-24 text-text-primary">
              함께 만들어가는 투두 리스트
            </span>
            <Image src={repair} alt="망치 이미지" width={28} height={28} />
          </div>
          <span className="font-semibold-32 text-gradient">Coworkers</span>
          <button
            onClick={startCoworkers}
            className="font-bold-16 absolute bottom-[48px] h-[45px] w-[343px] rounded-[32px] bg-gradient-to-r from-[#10B981] to-[#CEF57E] text-white"
          >
            지금 시작하기
          </button>
        </div>
      </div>
      <div className="relative mb-6 h-[467px] w-[343px] rounded-[40px] bg-gradient-to-r from-[#10B981] to-[#CEF57E] p-[1px]">
        <div className="h-full w-full rounded-[40px] bg-bg-primary">
          <div className="absolute left-[54px] top-[48px] flex flex-col gap-4">
            <Image
              src={file}
              alt="파일 이미지"
              width={76}
              height={76}
              className="mb-[-12px] ml-[-12px]"
            />
            <span className="font-medium-18 text-white">
              그룹으로
              <br />할 일을 관리해요
            </span>
          </div>
        </div>
        <Image
          src={sectionTop}
          alt="섹션1 이미지"
          width={235}
          height={273}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        />
      </div>
      <div className="relative mb-6 h-[467px] w-[343px] rounded-[40px] border border-bd-primary bg-bg-secondary outline-[1px]">
        <Image
          src={sectionMiddle}
          alt="섹션2 이미지"
          width={235}
          height={273}
          className="absolute left-1/2 top-0 -translate-x-1/2"
        />
        <div className="absolute bottom-[52px] left-[54px] flex flex-col gap-3">
          <Image
            src={mail}
            alt="메일 이미지"
            width={76}
            height={76}
            className="mb-[-12px] ml-[-12px]"
          />
          <div>
            <span className="font-medium-18 text-white">
              간단하게 멤버들을
              <br />
              초대해요
            </span>
          </div>
        </div>
      </div>

      <div className="relative h-[467px] w-[343px] rounded-[40px] bg-[#020617]">
        <Image
          src={sectionBottom}
          alt="섹션3 이미지"
          width={235}
          height={274}
          className="absolute left-1/2 top-0 -translate-x-1/2"
        />
        <div className="absolute bottom-[51px] left-[54px] flex flex-col gap-3">
          <Image
            src={checkBox}
            alt="체크박스 이미지"
            width={76}
            height={76}
            className="mb-[-12px] ml-[-12px]"
          />
          <div>
            <span className="font-medium-18 text-white">
              할 일도 간편하게
              <br />
              체크해요
            </span>
          </div>
        </div>
      </div>
      <div className="relative flex h-[640px] w-[375px] flex-col items-center md:h-[940px] md:w-[744px] lg:h-[1080px] lg:w-[1920px]">
        <div className="absolute top-[123px]">
          <div className="flex flex-col items-center gap-4">
            <span className="font-medium-24 text-white">
              지금 바로 시작해보세요
            </span>
            <span className="font-medium-16 text-center text-white">
              팀원 모두와 같은 방향,
              <br />
              같은 속도로 나아가는 가장 쉬운 방법
            </span>
          </div>
        </div>
        <div className="relative flex h-full w-full overflow-hidden">
          <Image
            src={landingBottomMobile}
            alt="랜딩 페이지 하단 이미지"
            width={375}
            height={640}
            quality={100}
            className="absolute inset-0 md:hidden lg:hidden"
          />
          <Image
            src={landingBottomTablet}
            alt="랜딩 페이지 하단 이미지"
            width={744}
            height={940}
            quality={100}
            className="absolute inset-0 sm:hidden md:block lg:hidden"
          />
          <Image
            src={landingBottom}
            alt="랜딩 페이지 하단 이미지"
            width={1920}
            height={1080}
            className="absolute inset-0 sm:hidden md:hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
}
