import { useState } from 'react';
import { useGetHistory } from '@/queries/history/useHitory';
import checkImg from '@/assets/image/icon/checkbox.svg';
import Image from 'next/image';
import { formatDate } from '@/utils/common';
import CustomDropdown from '@/components/common/dropdown/CustomDropdown';

type SortOrder = 'latest' | 'oldest';
type SortOrderLabel = '최신순' | '과거순';

const SORT_OPTIONS: Record<SortOrder, SortOrderLabel> = {
  latest: '최신순',
  oldest: '과거순',
};

const groupByDate = (tasksDone: any[]) => {
  return tasksDone.reduce((acc: Record<string, any[]>, task) => {
    const dateKey = task.doneAt.split('T')[0];
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(task);
    return acc;
  }, {});
};

export default function HistoryPage() {
  const { data: history, isLoading, isError, error } = useGetHistory();
  const { tasksDone = [] } = history || {};
  const groupedTasks = groupByDate(tasksDone);

  const [sortOrder, setSortOrder] = useState<SortOrder>('latest');

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>오류가 발생했습니다: {error?.message}</p>;

  const sortedDates = Object.keys(groupedTasks).sort((a, b) => {
    return sortOrder === 'latest'
      ? new Date(b).getTime() - new Date(a).getTime()
      : new Date(a).getTime() - new Date(b).getTime();
  });

  return (
    <section className="my-10 sm:mt-6 md:mt-6">
      <div className="flex justify-between">
        <h1 className="font-bold-20 text-text-primary">마이 히스토리</h1>
        <CustomDropdown
          items={[
            {
              label: SORT_OPTIONS['latest'],
              onClick: () => setSortOrder('latest'),
            },
            {
              label: SORT_OPTIONS['oldest'],
              onClick: () => setSortOrder('oldest'),
            },
          ]}
          defaultSelectedItem={SORT_OPTIONS[sortOrder]}
        />
      </div>
      <div className="mt-6 flex flex-col items-center space-y-10">
        {sortedDates.length === 0 ? (
          <div className="flex-center flex h-[calc(100vh-190px)]">
            <p className="font-medium-14 text-lg text-text-default">
              아직 히스토리가 없습니다.
            </p>
          </div>
        ) : (
          sortedDates.map((dateKey) => (
            <div key={dateKey} className="w-full">
              <h2 className="text-lg font-semibold text-text-primary">
                {formatDate(dateKey)}
              </h2>

              <div className="mt-4 space-y-4">
                {groupedTasks[dateKey]
                  .sort(
                    (a, b) =>
                      new Date(
                        sortOrder === 'latest' ? b.doneAt : a.doneAt,
                      ).getTime() -
                      new Date(
                        sortOrder === 'latest' ? a.doneAt : b.doneAt,
                      ).getTime(),
                  )
                  .map(({ id, name }) => (
                    <div
                      key={id}
                      className="flex items-center rounded-lg bg-bg-secondary p-[10px_14px]"
                    >
                      <Image
                        className="left-[12px]"
                        src={checkImg}
                        alt="확인"
                        width={24}
                        height={24}
                      />

                      <div className="ml-[3.5px]">
                        <p className="font-medium text-text-primary line-through">
                          {name || '제목 없음'}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
