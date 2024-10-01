import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import toggleIcon from '@/assets/image/icon/header-toggle.svg';
import TeamList from './TeamList';
import { useUserStore } from '@/store/authStore';
import { useUser } from '@/hooks/useUser';

export default function List() {
  const [isTeamListVisible, setIsTeamListVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const { accessToken } = useUserStore();
  const { data: user } = useUser(accessToken);

  const router = useRouter();

  const toggleTeamListVisibility = () => {
    setIsTeamListVisible((prevState) => !prevState);
  };

  const handleTeamSelect = (teamId: number, teamName: string) => {
    setSelectedTeam(teamName);
    router.push(`/groups/${teamId}`);
    setIsTeamListVisible(false);
  };

  // 로그인하지 않은 상태
  if (!accessToken) {
    return (
      <div className="relative flex gap-x-8 sm:hidden">
        <Link href="/boards">
          <span className="font-medium-16 text-text-primary">자유게시판</span>
        </Link>
      </div>
    );
  }

  const hasTeams = user?.memberships && user.memberships.length > 0;

  return (
    <div className="relative flex gap-x-8 sm:hidden">
      <div className="flex gap-x-[11px]">
        {/* 기본 경로에서 팀 생성하기 모달로 변경해야 함 */}
        <Link
          href={
            selectedTeam
              ? `/groups/${user?.memberships.find((m) => m.group.name === selectedTeam)?.group.id}`
              : hasTeams
                ? `/groups/${user.memberships[0].group.id}`
                : '/'
          }
        >
          <span className="font-medium-16 text-text-primary">
            {selectedTeam
              ? selectedTeam
              : hasTeams
                ? user.memberships[0].group.name
                : '팀 생성하기'}
          </span>
        </Link>
        <button onClick={toggleTeamListVisibility}>
          <Image src={toggleIcon} alt="토글" width={16} height={16} />
        </button>
      </div>

      <Link href="/boards">
        <span className="font-medium-16 text-text-primary">자유게시판</span>
      </Link>

      {isTeamListVisible && (
        <div className="team-list-translate">
          {hasTeams ? (
            <TeamList
              teams={user.memberships.map((m) => m.group)}
              onTeamSelect={handleTeamSelect}
            />
          ) : (
            <TeamList teams={[]} onTeamSelect={() => {}} />
          )}
        </div>
      )}
    </div>
  );
}
