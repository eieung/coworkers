import { useEffect, useState } from 'react';
import AddNewCategory from '@/components/tasks/AddNewCategory';
import DateManager from '@/components/tasks/DateManager';
import TaskList from '@/components/tasks/TaskList';
import { useRouter } from 'next/router';
import { getUser } from '@/utils/auth';
import { useGetCategories } from '@/queries/tasks/useTaskData';
import Error from '@/components/common/error';
import Loader from '@/components/common/Loader';

export default function TasksPage() {
  const router = useRouter();
  const { groupId } = router.query;
  const initialDate = new Date().toISOString().split('T')[0];
  const [currentDate, setCurrentDate] = useState(initialDate);

  const {
    data: categories,
    isLoading: isTaskListLoading,
    isError: isTaskListError,
    error: taskListError,
  } = useGetCategories(groupId as string);

  useEffect(() => {
    const user = getUser();

    if (!user) {
      router.push('/login');
    } else if (isTaskListError) {
      const statusCode = (taskListError as any).response?.status;

      // Unauthorized (401)일 때 로그인 페이지로 이동
      if (statusCode === 401) {
        console.error('Unauthorized - Redirecting to login');
        router.push('/login');
      } else {
        console.error('Error fetching task list:', taskListError);
      }
    }
  }, [router, isTaskListError, taskListError]);

  if (!groupId) return null;

  if (isTaskListError) {
    return (
      <Error
        errorMessage="데이터를 불러오는 중 오류가 발생했습니다."
        onRetry={() => router.push('/login')}
      />
    );
  }

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

      {isTaskListLoading ? (
        <div className="flex-center flex h-[600px]">
          <Loader className="" />
        </div>
      ) : (
        categories && (
          <TaskList
            categories={categories}
            groupId={groupId as string}
            currentDate={currentDate}
          />
        )
      )}
    </section>
  );
}
