import { useEffect, useState } from 'react';
import AddNewCategory from '@/components/tasks/AddNewCategory';
import DateManager from '@/components/tasks/DateManager';
import TaskList from '@/components/tasks/TaskList';
import { getTaskListsRequest } from '@/libs/taskListApi';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getUser } from '@/utils/auth';

export default function TasksPage() {
  const router = useRouter();
  const { groupId } = router.query;
  const initialDate = new Date().toISOString().split('T')[0];
  const [currentDate, setCurrentDate] = useState(initialDate);

  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  const {
    data: categories,
    isLoading: isTaskListLoading,
    isError: isTaskListError,
    error: taskListError,
  } = useQuery({
    queryKey: ['categories', groupId],
    queryFn: () => getTaskListsRequest({ groupId }),
    enabled: !!groupId,
  });

  return (
    <section className="mt-10 sm:mt-6 md:mt-6">
      <h1 className="font-bold-20 text-text-primary">할 일</h1>
      <div className="mt-6 flex items-center justify-between">
        <DateManager
          currentDate={currentDate}
          setCurrentDate={(date) => {
            setCurrentDate(date);
          }}
        />
        <AddNewCategory groupId={groupId as string} />
      </div>
      {categories && (
        <TaskList
          categories={categories}
          groupId={groupId as string}
          currentDate={currentDate}
        />
      )}
    </section>
  );
}
