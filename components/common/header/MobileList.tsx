import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUserStore } from '@/store/authStore';
import useModalStore from '@/store/useModalStore';
import TeamForm from '../modal/TeamForm';
import { useUsersQuery } from '@/queries/user/user';

export default function MobileList() {
  const { accessToken } = useUserStore();
  const { data: user } = useUsersQuery(accessToken);
  const openModal = useModalStore((state) => state.openModal);

  const teams =
    user?.data.memberships.map((membership) => membership.group) || [];

  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsVisible(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  if (!isVisible) return null;

  const hasTeams = user?.data.memberships && user.data.memberships.length > 0;

  const handleCreateTeamModal = () => {
    openModal((close) => (
      <TeamForm close={close} groupId={0} isEditMode={false} />
    ));
  };
  return (
    <div className="z-11 fixed bottom-0 left-0 right-0 top-14 bg-bg-tertiary md:hidden lg:hidden">
      <div className="flex h-full w-full flex-col items-start justify-start gap-y-6 p-6">
        {!accessToken && (
          <Link
            href="/boards"
            className="font-medium-14 block w-full rounded-md p-4 text-text-primary hover:bg-gray-500"
          >
            자유게시판
          </Link>
        )}

        {accessToken && (
          <>
            {hasTeams ? (
              <>
                {teams.map((team) => (
                  <Link
                    href={`/groups/${team.id}`}
                    key={team.id}
                    className="font-medium-14 block w-full rounded-md p-4 text-text-primary hover:bg-gray-500"
                  >
                    {team.name}
                  </Link>
                ))}
                <button
                  className="font-medium-14 block w-full rounded-md p-4 text-left text-text-primary hover:bg-gray-500"
                  onClick={handleCreateTeamModal}
                >
                  팀 생성하기
                </button>
                <Link
                  href="/boards"
                  className="font-medium-14 block w-full rounded-md p-4 text-text-primary hover:bg-gray-500"
                >
                  자유게시판
                </Link>
              </>
            ) : (
              <>
                <button
                  className="font-medium-14 block w-full rounded-md p-4 text-left text-text-primary hover:bg-gray-500"
                  onClick={handleCreateTeamModal}
                >
                  팀 생성하기
                </button>
                <Link
                  href="/boards"
                  className="font-medium-14 block w-full rounded-md p-4 text-text-primary hover:bg-gray-500"
                >
                  자유게시판
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
