import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import toggleIcon from '@/assets/image/icon/header-toggle.svg';
import TeamList from './TeamList';
import { useUserStore } from '@/store/authStore';
import { useGroupStore } from '@/store/useGroupStore';
import { useUsersQuery } from '@/queries/user/user';
import { useState, useEffect, useRef } from 'react';
import useClickOutside from '@/hooks/useClickOutside';

export default function List() {
  const [isTeamListVisible, setIsTeamListVisible] = useState(false);
  const { accessToken } = useUserStore();
  const { data: user } = useUsersQuery(accessToken);
  const {
    selectedGroupId,
    setSelectedGroupId,
    initialGroupId,
    setInitialGroupId,
  } = useGroupStore();

  const router = useRouter();
  const { groupId } = router.query;

  const teamListRef = useRef<HTMLDivElement>(null);
  useClickOutside(teamListRef, () => setIsTeamListVisible(false));

  useEffect(() => {
    if (user?.data.memberships && user.data.memberships.length > 0) {
      if (initialGroupId === null) {
        // 초기 그룹 ID 설정 (첫 로드 시에만)
        setInitialGroupId(user.data.memberships[0].group.id);
      }

      if (groupId) {
        // URL에 groupId가 있으면 그 값을 사용
        setSelectedGroupId(Number(groupId));
      } else if (selectedGroupId === null) {
        // selectedGroupId가 null이면 initialGroupId 사용
        setSelectedGroupId(initialGroupId);
      }
    }
  }, [
    groupId,
    user,
    selectedGroupId,
    initialGroupId,
    setSelectedGroupId,
    setInitialGroupId,
  ]);

  const toggleTeamListVisibility = () => {
    setIsTeamListVisible((prevState) => !prevState);
  };

  const handleTeamSelect = (groupId: number) => {
    setSelectedGroupId(groupId);
    router.push(`/groups/${groupId}`);
    setIsTeamListVisible(false);
  };

  const handleGetStarted = () => {
    router.push('/get-started-team');
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

  const hasTeams = user?.data.memberships && user.data.memberships.length > 0;

  const selectedTeamName =
    hasTeams && selectedGroupId
      ? user.data.memberships.find((m) => m.group.id === selectedGroupId)?.group
          .name
      : '팀 시작하기';

  return (
    <div className="relative flex gap-x-8 sm:hidden" ref={teamListRef}>
      <div className="flex gap-x-[11px]">
        {selectedTeamName === '팀 시작하기' ? (
          <button onClick={handleGetStarted}>
            <span className="font-medium-16 text-text-primary">
              {selectedTeamName}
            </span>
          </button>
        ) : (
          <Link href={selectedGroupId ? `/groups/${selectedGroupId}` : '/'}>
            <span className="font-medium-16 text-text-primary">
              {selectedTeamName}
            </span>
          </Link>
        )}
        {hasTeams && (
          <button onClick={toggleTeamListVisibility}>
            <Image src={toggleIcon} alt="토글" width={16} height={16} />
          </button>
        )}
      </div>

      <Link href="/boards">
        <span className="font-medium-16 text-text-primary">자유게시판</span>
      </Link>

      {isTeamListVisible && hasTeams && (
        <div className="team-list-translate">
          <TeamList
            teams={user.data.memberships.map((m) => m.group)}
            onTeamSelect={handleTeamSelect}
          />
        </div>
      )}
    </div>
  );
}
