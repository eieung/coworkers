import { useRouter } from 'next/router';
import Dropdown from '@/components/common/dropdown/Dropdown';
import userIcon from '@/assets/image/icon/user.svg';
import { useUserStore } from '@/store/authStore';
import { useUser } from '@/hooks/useUser';
import useModalStore from '@/store/useModalStore';
import CustomInputModal from '../modal/CustomInputModal';
import { toast } from 'react-toastify';

export default function Profile() {
  const { clearUser, accessToken } = useUserStore();
  const router = useRouter();
  const { data: user } = useUser(accessToken);
  const openModal = useModalStore((state) => state.openModal);

  // api 연동 필요
  const handleCustomInputModal = () => {
    openModal((close) => (
      <CustomInputModal
        close={close}
        title={<div className="font-medium-24 mb-10">팀 참여하기</div>}
        buttonText={'참여하기'}
        onAction={(data) => {
          toast.success(`${data} 팀에 참여되었습니다!`);
        }}
        placeholder={'팀 링크를 입력해주세요.'}
        label={'팀 링크'}
        className={'max-w-[400px] md:max-w-[350px]'}
        childrenClassName={'w-[350px] sm:w-[300px] md:-w-[300px]'}
        bottomDescription={'공유받은 팀 링크를 입력해 참여할 수 있어요.'}
      />
    ));
  };

  const handleLogout = () => {
    clearUser();
    router.push('/login');
  };

  const loggedInMenuItems = [
    { label: '마이 히스토리', href: '/history' },
    { label: '계정 설정', href: '/settings' },
    { label: '팀 참여', onClick: handleCustomInputModal },
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
      className="w-[135px]"
    />
  );
}
