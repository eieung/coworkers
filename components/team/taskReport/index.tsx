import ProgressBar from '@/components/common/progressBar';
import Image from 'next/image';
import todoIcon from '@/assets/image/task/todo.svg';
import doneIcon from '@/assets/image/task/done.svg';

export default function TaskReport() {
  return (
    <div className="mt-8">
      <strong className="font-medium-16 text-text-primary">리포트</strong>
      <div className="mt-4 flex flex-row items-center justify-between gap-x-10 rounded-xl bg-bg-secondary p-6">
        <div className="flex w-[168px] min-w-[112px] flex-col items-center gap-y-1">
          {/* <span className="font-medium-14 text-text-primary">
            오늘의 진행 상황
          </span> */}
          <ProgressBar
            percentage={85}
            useGradient
            trailColor="#334155"
            showText={true}
          />
          {/* 아직 조금 남았어요~ 오늘의 할 일을 끝냈어요~ 이런 식? */}
        </div>
        <div className="flex w-[400px] flex-col gap-y-4">
          <div className="flex w-full flex-row justify-between gap-x-3 rounded-xl bg-bg-tertiary p-4">
            <div className="flex flex-col">
              <span className="font-medium-12 mb-1 text-text-secondary">
                오늘의 할 일
              </span>
              <strong className="font-bold-24 text-brand-tertiary">20개</strong>
            </div>
            <Image src={todoIcon} alt="오늘의 할 일" width={40} height={40} />
          </div>

          <div className="flex w-full flex-row justify-between gap-x-3 rounded-xl bg-bg-tertiary p-4">
            <div className="flex flex-col">
              <span className="font-medium-12 mb-1 text-text-secondary">
                한 일
              </span>
              <strong className="font-bold-24 text-brand-tertiary">5개</strong>
            </div>
            <Image src={doneIcon} alt="오늘의 할 일" width={40} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
}