import Image from 'next/image';
import settingIcon from '@/assets/image/icon/gear.svg';
import thumbnailTeam from '@/assets/image/task/thumbnail-team.svg';
import { useGroup } from '@/hooks/useGroup';
import Dropdown from '@/components/common/dropdown/Dropdown';
import TeamForm from '@/components/common/modal/TeamForm';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import useModalStore from '@/store/useModalStore';
import { useDeleteGroup } from '@/hooks/useDeleteGroup';

interface TeamSettingProps {
  groupId: number;
  isAdmin: boolean;
}

export default function TeamSetting({ groupId, isAdmin }: TeamSettingProps) {
  const { data: groupData, isLoading, error } = useGroup(groupId);
  const openModal = useModalStore((state) => state.openModal);
  const deleteGroupMutation = useDeleteGroup();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  // TODO: 이 부분 어떻게 처리하면 좋을 지?
  if (!groupData) return <div>데이터 없음</div>;

  const handleEditTeam = () => {
    openModal((close) => (
      <TeamForm
        close={close}
        name={groupData?.name}
        image={groupData?.image}
        isEditMode={true}
        groupId={groupId}
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
          deleteGroupMutation.mutate(groupId);
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
          itemClassName="w-full h-10"
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
