import Image from 'next/image';
import thumbnailTeam from '@/assets/image/task/thumbnail-team.svg';

export default function TeamSettingLoading() {
  return (
    <div className="relative mt-6 flex h-16 items-center justify-between rounded-xl bg-bg-secondary px-6 py-5">
      <strong className="font-bold-20 text-white">그룹명</strong>
      <Image
        src={thumbnailTeam}
        alt="팀 설정 배경"
        width={181}
        height={64}
        className="absolute right-20 top-0"
      />
    </div>
  );
}
