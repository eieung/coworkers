import { useRouter } from 'next/router';
import Dropdown from '@/components/common/dropdown/Dropdown';
import userIcon from '@/assets/image/icon/user.svg';
import { useUserStore } from '@/store/authStore';
import { useUser } from '@/hooks/useUser';

export default function Profile() {
  const { clearUser, accessToken } = useUserStore();
  const router = useRouter();
  const { data: user } = useUser(accessToken);

  const handleLogout = () => {
    clearUser();
    router.push('/login');
  };

  const loggedInMenuItems = [
    { label: '마이 히스토리', href: '/history' },
    { label: '계정 설정', href: '/settings' },
    { label: '팀 참여', href: '/team' },
    { label: '로그아웃', onClick: handleLogout },
  ];

  const loggedOutMenuItems = [{ label: '로그인', href: '/login' }];
  const menuItems = accessToken ? loggedInMenuItems : loggedOutMenuItems;

  if (!accessToken) {
    return (
      <Dropdown
        trigger={
          <div className="flex items-center gap-x-2">
            <span className="font-medium-14 text-text-primary lg:block">
              로그인
            </span>
          </div>
        }
        items={menuItems}
      />
    );
  }

  return (
    <Dropdown
      trigger={
        <div className="flex items-center gap-x-2">
          <img
            src={user?.image || userIcon.src}
            alt="프로필"
            width={24}
            height={24}
            className="rounded-full object-contain md:h-4 md:w-4 lg:h-4 lg:w-4"
          />
          <span className="font-medium-14 hidden text-text-primary lg:block">
            {user?.nickname}
          </span>
        </div>
      }
      items={menuItems}
    />
  );
}
