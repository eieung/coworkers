import Image from 'next/image';
import Dropdown from '@/components/common/dropdown/Dropdown';
import userIcon from '@/assets/image/icon/user.svg';
import { useUserStore } from '@/store/authStore';
import { useRouter } from 'next/router';

export default function Profile() {
  const { clearUser } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    clearUser();
    router.push('/login');
  };

  const menuItems = [
    { label: '마이 히스토리', href: '/history' },
    { label: '계정 설정', href: '/settings' },
    { label: '팀 참여', href: '/team' },
    { label: '로그아웃', onClick: handleLogout },
  ];

  return (
    <Dropdown
      trigger={
        <div className="flex items-center gap-x-2">
          <Image
            src={userIcon}
            alt="프로필"
            width={24}
            height={24}
            className="md:h-4 md:w-4 lg:h-4 lg:w-4"
          />
          <span className="font-medium-14 text-text-primary lg:block">
            프로필
          </span>
        </div>
      }
      items={menuItems}
    />
  );
}
