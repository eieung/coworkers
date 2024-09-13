import Image from 'next/image';
import memberIcon from '@/assets/image/icon/member.svg';
import kebabIcon from '@/assets/image/icon/kebab.svg';

interface MemberProps {
  member: {
    userImage: string;
    userEmail: string;
    userName: string;
  };
}

export default function MemberList({ member }: MemberProps) {
  return (
    <div className="flex h-[68px] w-full max-w-[384px] items-center justify-between rounded-2xl bg-bg-secondary px-6 py-5 md:h-[73px] lg:h-[73px]">
      <div className="flex min-w-0 flex-1 items-center gap-x-3">
        <img
          src={member.userImage || memberIcon}
          alt="유저 이미지"
          width={32}
          height={32}
          className='rounded-full'
        />
        <div className="flex min-w-0 flex-col">
          <span className="font-medium-14 text-text-primary">
            {member.userName}
          </span>
          <span className="font-regular-12 truncate text-text-secondary">
            {member.userEmail}
          </span>
        </div>
      </div>
      <button className="flex-shrink-0">
        <Image src={kebabIcon} alt="메뉴" width={16} height={16} />
      </button>
    </div>
  );
}
