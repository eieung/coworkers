import Image from 'next/image';
import settingIcon from '@/assets/image/icon/gear.svg';
import thumbnailTeam from '@/assets/image/task/thumbnail-team.svg';
import { useGroup } from '@/hooks/useGroup';

interface TeamSettingProps {
  groupId: number;
}

export default function TeamSetting({ groupId }: TeamSettingProps) {
  const { data: groupData, isLoading, error } = useGroup(groupId);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  // TODO: 이 부분 어떻게 처리하면 좋을 지?
  if (!groupData) return <div>데이터 없음</div>;

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
      {/* TODO: 버튼 누르면 DropDown 나오게 해야 함 */}
      <button>
        <Image src={settingIcon} alt="설정" width={24} height={24} />
      </button>
    </div>
  );
}
