import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUserStore } from '@/store/authStore';
import { useUser } from '@/hooks/useUser';

export default function MobileList() {
  const { accessToken } = useUserStore();
  const { data: user } = useUser(accessToken);

  const teams = user?.memberships.map((membership) => membership.group) || [];

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

  return (
    <div className="z-11 fixed bottom-0 left-0 right-0 top-14 bg-bg-tertiary md:hidden lg:hidden">
      <div className="flex h-full w-full flex-col items-start justify-start gap-y-6 p-6">
        {accessToken &&
          teams.map((team) => (
            <Link
              href={`/groups/${team.id}`}
              key={team.id}
              className="font-medium-14 block w-full rounded-md p-4 text-text-primary hover:bg-gray-500"
            >
              {team.name}
            </Link>
          ))}

        <Link
          href="/boards"
          className="font-medium-14 block w-full rounded-md p-4 text-text-primary hover:bg-gray-500"
        >
          자유게시판
        </Link>
      </div>
    </div>
  );
}
