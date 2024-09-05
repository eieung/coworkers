import Image from 'next/image';
import Link from 'next/link';
import userIcon from '@/assets/image/icon/user.svg';

export default function Profile() {
  return (
    <div className="flex">
      <Link href="/login">
        <span className="font-medium-16 hidden text-text-primary">로그인</span>
      </Link>
      <button className="flex items-center gap-x-2">
        <Image
          src={userIcon}
          alt="프로필"
          width={24}
          height={24}
          className="md:h-4 md:w-4 lg:h-4 lg:w-4"
        />
        <span className="font-medium-14 hidden text-text-primary lg:block">
          프로필
        </span>
      </button>
    </div>
  );
}
