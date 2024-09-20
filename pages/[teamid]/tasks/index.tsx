import AddNewTask from '@/components/tasks/AddNewTask';
import DateManager from '@/components/tasks/DateManager';
import TaskList from '@/components/tasks/TaskList';

const groupId = 886;

export default function TasksPage() {
  return (
    <section className="mt-10 sm:mt-6 md:mt-6">
      <h1 className="font-bold-20 text-text-primary">할 일</h1>
      <div className="mt-6 flex items-center justify-between">
        <DateManager />
        <AddNewTask />
      </div>
      <TaskList />
    </section>
  );
}
