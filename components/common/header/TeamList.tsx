import Image from 'next/image';
import kebabIcon from '@/assets/image/icon/kebab.svg';
import plusIcon from '@/assets/image/icon/plus.svg';
import teams from './mock.json';

export default function TeamList() {
  return (
    <div className="h-auto w-[218px] rounded-2xl bg-bg-secondary p-4">
      {teams.map((team, index) => (
        <div
          key={index}
          className="mb-2 flex items-center justify-between rounded-[8px] p-2 hover:bg-bg-tertiary"
        >
          <div className="flex items-center gap-x-3">
            <img
              src={team.image}
              alt={`${team.name} 이미지`}
              className="h-8 w-8 rounded-[6px]"
            />
            <span className="font-medium-16 text-white">{team.name}</span>
          </div>
          <button className="text-white">
            <Image src={kebabIcon} alt="케밥 아이콘" width={16} height={16} />
          </button>
        </div>
      ))}
      <button className="font-medium-16 mt-4 flex h-12 w-full items-center justify-center gap-x-1 rounded-2xl border border-solid border-white bg-bg-secondary text-white">
        <Image src={plusIcon} alt="팀 추가하기" width={16} height={16} />
        <span>팀 추가하기</span>
      </button>
    </div>
  );
}
