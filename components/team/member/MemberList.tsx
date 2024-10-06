import Image from 'next/image';
import memberIcon from '@/assets/image/icon/member.svg';
import kebabIcon from '@/assets/image/icon/kebab.svg';
import crownIcon from '@/assets/image/icon/crown.svg';
import { Member } from '@/types/group';
import kickUserIcon from '@/assets/image/icon/kick-user.svg';
import userInfoIcon from '@/assets/image/icon/info.svg';
import { useEffect, useRef, useState } from 'react';
import useModalStore from '@/store/useModalStore';
import CopyEmail from '@/components/common/modal/CopyEmail';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { toast } from 'react-toastify';
import { useDeleteMember } from '@/hooks/useDeleteMember';
import { useUserStore } from '@/store/authStore';

interface MemberProps {
  member: Member;
  isAdmin: boolean;
}

export default function MemberList({ member, isAdmin }: MemberProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openModal = useModalStore((state) => state.openModal);

  const deleteMemberMutation = useDeleteMember(member.groupId);

  const { user } = useUserStore();
  const currentUserId = user?.id;

  const handleKebabClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleOpenUserInfoModal = () => {
    openModal((close) => (
      <CopyEmail
        close={close}
        userImage={member.userImage}
        userName={member.userName}
        userEmail={member.userEmail}
      />
    ));
  };

  const handleKickUserModal = () => {
    if (member.userId === currentUserId) {
      toast.error('자기 자신을 추방할 수 없습니다.');
      return;
    }

    openModal((close) => (
      <ConfirmModal
        title="멤버 추방하기"
        description={'멤버를 추방합니다.\n정말 추방하시겠어요?'}
        close={close}
        isAlert={true}
        confirmText="추방하기"
        onConfirm={() => {
          deleteMemberMutation.mutate(member.userId);
          close();
        }}
        buttonType="danger"
      />
    ));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-[68px] w-full max-w-[384px] items-center justify-between rounded-2xl bg-bg-secondary px-6 py-5 md:h-[73px] lg:h-[73px]">
      <div className="flex min-w-0 flex-1 items-center gap-x-3">
        <img
          src={member.userImage || memberIcon.src}
          alt="유저 이미지"
          width={32}
          height={32}
          className="rounded-full object-contain"
        />
        <div className="flex min-w-0 flex-col">
          <span className="font-medium-14 flex flex-row gap-x-1 text-text-primary">
            {member.userName}
            {member.role === 'ADMIN' && (
              <Image src={crownIcon} alt="관리자" width={14} height={17} />
            )}
          </span>
          <span className="font-regular-12 truncate text-text-secondary">
            {member.userEmail}
          </span>
        </div>
      </div>
      {isMenuOpen ? (
        <div className="flex items-center justify-center gap-x-1" ref={menuRef}>
          <button onClick={handleOpenUserInfoModal}>
            <Image src={userInfoIcon} alt="정보" width={16} height={16} />
          </button>
          {isAdmin && (
            <button onClick={handleKickUserModal}>
              <Image
                src={kickUserIcon}
                alt="추방"
                width={16}
                height={16}
                className="mt-[2px]"
              />
            </button>
          )}
        </div>
      ) : (
        <button className="flex-shrink-0" onClick={handleKebabClick}>
          <Image src={kebabIcon} alt="메뉴" width={16} height={16} />
        </button>
      )}
    </div>
  );
}
