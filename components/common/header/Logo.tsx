import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/image/logo/logo.svg';

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src={logo}
        alt="코워커스"
        className="h-5 w-[102px] md:h-5 md:w-[102px] lg:h-8 lg:w-[158px]"
      />
    </Link>
  );
}
