import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/image/logo/logo.svg';
import userIcon from '@/assets/image/icon/user.svg';
import toggleIcon from '@/assets/image/icon/header-toggle.svg';
import menuIcon from '@/assets/image/icon/gnb-menu.svg';

export default function Header() {
  return (
    <header className="z-999 fixed top-0 flex h-60 w-full items-center justify-center border-b border-transparent border-b-bd-primary bg-bg-secondary px-16 py-20 md:px-24 md:py-20">
      <div className="flex w-1200 items-center justify-between md:h-20">
        <div className="flex items-center justify-between gap-x-16 md:gap-x-32 lg:gap-x-40">
          <Image
            src={menuIcon}
            alt="메뉴"
            width={24}
            height={24}
            className="md:hidden lg:hidden"
          />
          <Link href="/">
            <Image
              src={logo}
              alt="코워커스"
              className="h-20 w-102 md:h-20 md:w-102 lg:h-32 lg:w-158"
            />
          </Link>
          <div className="flex gap-x-32 sm:hidden">
            <div className="flex gap-x-11">
              <Link href="/exam">
                <span className="font-medium-16 text-text-primary">
                  경영관리팀
                </span>
              </Link>
              <Image src={toggleIcon} alt="토글" width={16} height={16} />
            </div>
            <Link href="/boards">
              <span className="font-medium-16 text-text-primary">
                자유게시판
              </span>
            </Link>
          </div>
        </div>
        <div className="flex">
          <Link href="/login">
            <span className="font-medium-16 hidden text-text-primary">
              로그인
            </span>
          </Link>
          <button>
            <Image src={userIcon} alt="프로필" width={24} height={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
