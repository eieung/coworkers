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
import { WOW } from 'wow.js';
import 'animate.css';
import { useEffect } from 'react';
import { authAxiosInstance } from '@/services/axios';
import { useUserStore } from '@/store/authStore';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { GroupResponse } from '@/types/group';

export default function Home() {
  const { accessToken } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const initWow = async () => {
      if (typeof window !== 'undefined') {
        const WOW = require('wow.js');
        new WOW({
          boxClass: 'wow',
          animateClass: 'animate__animated',
          offset: 0,
          mobile: true,
          live: true,
        }).init();
      }
    };
    initWow();
  }, []);

  const startCoworkers = async () => {
    if (accessToken) {
      try {
        const response = await authAxiosInstance.get('/user/groups');
        let groups = response.data;
        const sortGroupsById = (groups: GroupResponse[]): GroupResponse[] => {
          return [...groups].sort((a, b) => Number(a.id) - Number(b.id));
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
    <div className="mx-auto flex flex-col items-center overflow-x-hidden">
      <div className="relative flex h-[640px] w-full flex-col items-center overflow-hidden md:h-[940px] lg:h-[1080px]">
        <div className="absolute inset-0 h-full w-full">
          <Image
            src={landingTop}
            alt="랜딩 페이지 상단 이미지"
            objectFit="cover"
            fill
            quality={100}
          />
        </div>

        <div className="mt-[55px] flex flex-col items-center gap-3 md:mt-[100px] lg:mt-[84px]">
          <div className="flex sm:gap-[4px] md:gap-[16px] lg:gap-[24px]">
            <span className="font-semibold-24 md:font-medium-40 text-text-primary lg:text-5xl">
              함께 만들어가는 투두 리스트
            </span>
            <Image
              src={repair}
              alt="망치 이미지"
              width={28}
              height={28}
              className="md:h-[48px] md:w-[48px] lg:h-[56px] lg:w-[56px]"
            />
          </div>
          <span className="font-semibold-32 text-gradient md:text-5xl lg:text-6xl">
            Coworkers
          </span>
          <button
            onClick={startCoworkers}
            className="font-bold-16 absolute bottom-[48px] h-[45px] w-[343px] rounded-[32px] bg-gradient-to-r from-[#10B981] to-[#CEF57E] text-white md:bottom-[119px] md:w-[373px] lg:bottom-[120px] lg:w-[373px]"
          >
            지금 시작하기
          </button>
        </div>
      </div>

      <div
        className="wow animate__animated animate__fadeInLeft relative mx-4 mb-6 h-[467px] w-[343px] rounded-[40px] bg-gradient-to-r from-[#10B981] to-[#CEF57E] p-[1px] md:mx-6 md:h-[354px] md:w-[696px] lg:mb-20 lg:mt-[60px] lg:h-[419px] lg:w-[996px]"
        data-wow-duration="1.5s"
      >
        <div className="h-full w-full rounded-[40px] bg-bg-primary">
          <div className="absolute top-[48px] flex flex-col gap-4 sm:left-[54px] md:right-[121.5px] md:top-[124px] lg:right-[181px] lg:top-[155px]">
            <Image
              src={file}
              alt="파일 이미지"
              width={76}
              height={76}
              className="mb-[-12px] ml-[-12px]"
            />

            <span className="font-medium-18 lg:font-medium-24 text-white">
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
          className="absolute bottom-0 left-1/2 sm:-translate-x-1/2 md:left-[124px] lg:left-[174px] lg:h-[338px] lg:w-[291px]"
        />
      </div>
      <div
        className="wow animate__animated animate__fadeInRight relative mx-4 mb-6 h-[467px] w-[343px] rounded-[40px] border border-bd-primary bg-bg-secondary outline-[1px] md:mx-6 md:h-[354px] md:w-[696px] lg:mb-20 lg:h-[419px] lg:w-[996px]"
        data-wow-duration="1.5s"
      >
        <Image
          src={sectionMiddle}
          alt="섹션2 이미지"
          width={235}
          height={273}
          className="absolute sm:left-1/2 sm:top-0 sm:-translate-x-1/2 md:right-[121px] md:top-0 lg:right-[174px] lg:h-[338px] lg:w-[291px]"
        />
        <div className="absolute flex flex-col gap-3 sm:bottom-[52px] sm:left-[54px] md:bottom-[152px] md:left-[121px] lg:bottom-[152px] lg:left-[165px] lg:items-end">
          <Image
            src={mail}
            alt="메일 이미지"
            width={76}
            height={76}
            className="sm:mb-[-12px] sm:ml-[-12px] md:mb-[-12px] md:ml-[-12px] lg:mb-[-12px] lg:mr-[-12px]"
          />

          <div className="md:text-right lg:text-right">
            <span className="sm:font-medium-18 md:font-medium-24 lg:font-medium-24 text-white">
              간단하게 멤버들을
              <br />
              초대해요
            </span>
          </div>
        </div>
      </div>

      <div
        className="wow animate__animated animate__fadeInLeft relative mx-4 h-[467px] w-[343px] rounded-[40px] bg-[#020617] md:mx-6 md:h-[354px] md:w-[696px] lg:h-[419px] lg:w-[996px]"
        data-wow-duration="1.5s"
      >
        <Image
          src={sectionBottom}
          alt="섹션3 이미지"
          width={235}
          height={274}
          className="absolute sm:left-1/2 sm:top-0 sm:-translate-x-1/2 md:left-[121px] lg:left-[174px] lg:top-0 lg:h-[338px] lg:w-[291px]"
        />
        <div className="absolute flex flex-col gap-3 sm:bottom-[51px] sm:left-[54px] md:bottom-[140px] md:right-[132px] lg:right-[181px] lg:top-[151px]">
          <Image
            src={checkBox}
            alt="체크박스 이미지"
            width={76}
            height={76}
            className="mb-[-12px] ml-[-12px]"
          />
          <div>
            <span className="font-medium-18 lg:font-medium-24 text-white">
              할 일도 간편하게
              <br />
              체크해요
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex h-[431px] w-full flex-col items-center overflow-x-hidden md:h-[675px] md:w-full lg:h-[1080px] lg:w-[1080px] lg:w-full">
        <div className="absolute sm:top-[123px] md:top-[176px] lg:top-[230px]">
          <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-6">
            <span className="font-medium-24 md:font-medium-40 lg:font-medium-40 text-white">
              지금 바로 시작해보세요
            </span>
            <span className="font-medium-16 md:font-medium-24 lg:font-medium-24 text-center text-white">
              팀원 모두와 같은 방향, <br className="md:hidden lg:hidden" />
              같은 속도로 나아가는 가장 쉬운 방법
            </span>
          </div>
        </div>
        <div className="relative flex h-full w-full overflow-hidden">
          <Image
            src={landingBottom}
            alt="랜딩 페이지 하단 이미지"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
