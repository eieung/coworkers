import Image from 'next/image';
import settingIcon from '@/assets/image/icon/gear.svg';
import thumbnailTeam from '@/assets/image/task/thumbnail-team.svg';
import Dropdown from '@/components/common/dropdown/Dropdown';
import TeamForm from '@/components/common/modal/TeamForm';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import useModalStore from '@/store/useModalStore';
import { useDeleteGroupMutation, useGroupsQuery } from '@/queries/group/group';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store/authStore';
import { useUsersQuery } from '@/queries/user/user';
import Error from '@/components/common/error';

export default function TeamSetting() {
  const router = useRouter();
  const { groupId } = router.query;

  const {
    data: groupResponse,
    isLoading,
    error,
  } = useGroupsQuery(groupId as string);
  const openModal = useModalStore((state) => state.openModal);
  const deleteGroupMutation = useDeleteGroupMutation();

  const groupData = groupResponse?.data;
  const { accessToken } = useUserStore();
  const { data: userData } = useUsersQuery(accessToken);

  const isAdmin =
    groupData && userData
      ? groupData.members.some(
          (member) =>
            member.userId === userData.data.id && member.role === 'ADMIN',
        )
      : false;
  if (isLoading) return <div>로딩 중...</div>;
  if (error) {
    return (
      <Error
        errorMessage="데이터를 불러오는 중 오류가 발생했습니다."
        onRetry={() => router.push('/login')}
      />
    );
  }
  if (!groupData) return null;

  const handleEditTeam = () => {
    openModal((close) => (
      <TeamForm
        close={close}
        name={groupData?.name}
        image={groupData?.image}
        isEditMode={true}
        groupId={groupId as string}
      />
    ));
  };

  const handleDeleteTeam = () => {
    openModal((close) => (
      <ConfirmModal
        title="팀을 삭제하시겠어요?"
        description="삭제시 복구가 불가합니다. 정말 삭제하시겠어요?"
        close={close}
        confirmText="삭제하기"
        onConfirm={() => {
          deleteGroupMutation.mutate(groupId as string);
          close();
        }}
        buttonType="danger"
      />
    ));
  };

  return (
    <div className="relative flex h-16 items-center justify-between rounded-xl bg-bg-secondary px-6 py-5">
      <strong className="font-bold-20 text-white">{groupData.name}</strong>
      <Image
        src={thumbnailTeam}
        alt="팀 설정 배경"
        width={181}
        height={64}
        className="absolute right-20 top-0"
      />

      {isAdmin ? (
        <Dropdown
          trigger={
            <Image src={settingIcon} alt="설정" width={24} height={24} />
          }
          items={[
            { label: '수정하기', onClick: handleEditTeam },
            { label: '삭제하기', onClick: handleDeleteTeam },
          ]}
          className="w-[120px]"
        />
      ) : (
        <img
          src={groupData.image}
          alt={`${groupData.name} 이미지`}
          width={32}
          height={32}
          className="rounded-xl object-contain"
        />
      )}
    </div>
  );
}
