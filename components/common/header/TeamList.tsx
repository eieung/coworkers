import Image from 'next/image';
import kebabIcon from '@/assets/image/icon/kebab.svg';
import plusIcon from '@/assets/image/icon/plus.svg';
import useModalStore from '@/store/useModalStore';
import TeamForm from '../modal/TeamForm';

interface Team {
  id: number;
  name: string;
  image: string;
}

interface TeamListProps {
  teams: Team[];
  onTeamSelect: (teamId: number, teamName: string) => void;
}

export default function TeamList({
  teams,
  onTeamSelect,
}: TeamListProps) {
  const openModal = useModalStore((state) => state.openModal);



  const handleCreateTeamModal = () => {
    openModal((close) => (
      <TeamForm close={close} groupId={0} isEditMode={false} />
    ));
  };

  return (
    <div
      className="h-auto w-[218px] rounded-2xl bg-bg-secondary p-4"
    >
      {teams.length > 0 &&
        teams.map((team) => (
          <button
            key={team.id}
            className="mb-2 flex w-full items-center justify-between rounded-[8px] p-2 hover:bg-bg-tertiary"
            onClick={() => onTeamSelect(team.id, team.name)}
          >
            <div className="flex items-center gap-x-3">
              <img
                src={team.image}
                alt={`${team.name} 이미지`}
                className="h-8 w-8 rounded-[6px] object-cover"
              />
              <span className="font-medium-16 text-white">{team.name}</span>
            </div>
            <button className="text-white">
              <Image src={kebabIcon} alt="케밥 아이콘" width={16} height={16} />
            </button>
          </button>
        ))}
      <button
        onClick={handleCreateTeamModal}
        className="font-medium-16 flex h-12 w-full items-center justify-center gap-x-1 rounded-2xl border border-solid border-white bg-bg-secondary text-white"
      >
        <Image src={plusIcon} alt="팀 추가하기" width={16} height={16} />
        <span>팀 추가하기</span>
      </button>
    </div>
  );
}