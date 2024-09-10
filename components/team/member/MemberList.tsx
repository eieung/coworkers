import Image from 'next/image';
import memberIcon from '@/assets/image/icon/member.svg';
import kebabIcon from '@/assets/image/icon/kebab.svg';

export default function MemberList() {
  return (
    <div className="flex h-[68px] w-full max-w-[384px] items-center justify-between rounded-2xl bg-bg-secondary px-6 py-5 md:h-[73px] lg:h-[73px]">
      <div className="flex min-w-0 flex-1 items-center gap-x-3">
        <Image src={memberIcon} alt="멤버" width={32} height={32} />
        <div className="flex min-w-0 flex-col">
          <span className="font-medium-14 text-text-primary">김슬아</span>
          <span className="font-regular-12 truncate text-text-secondary">
            seula123123@codeit.com
          </span>
        </div>
      </div>
      <button className="flex-shrink-0">
        <Image src={kebabIcon} alt="메뉴" width={16} height={16} />
      </button>
    </div>
  );
}
