import Image from 'next/image';
import Link from 'next/link';
import toggleIcon from '@/assets/image/icon/header-toggle.svg';
import { useState } from 'react';
import TeamList from './TeamList';
import { useUserStore } from '@/store/authStore';

export default function List() {
  const [isTeamListVisible, setIsTeamListVisible] = useState(false);
  const { accessToken } = useUserStore();

  const toggleTeamListVisibility = () => {
    setIsTeamListVisible((prevState) => !prevState);
  };

  return (
    <div className="relative flex gap-x-8 sm:hidden">
      {accessToken && (
        <div className="flex gap-x-[11px]">
          <Link href="/team">
            <span className="font-medium-16 text-text-primary">경영관리팀</span>
          </Link>
          <button onClick={toggleTeamListVisibility}>
            <Image src={toggleIcon} alt="토글" width={16} height={16} />
          </button>
        </div>
      )}
      <Link href="/boards">
        <span className="font-medium-16 text-text-primary">자유게시판</span>
      </Link>
      {isTeamListVisible && (
        <div className="team-list-translate">
          <TeamList />
        </div>
      )}
    </div>
  );
}
