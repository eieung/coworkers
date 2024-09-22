import { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import Button from '@/components/common/button';
import useModalStore from '@/store/useModalStore';
import DatePicker from '@/components/common/modal/DatePicker';
import { TaskListType } from '@/types/taskListType';

interface TaskListProps {
  taskList: TaskListType[];
}

const TaskList: React.FC<TaskListProps> = ({ taskList }) => {
  const [categories, setCategories] = useState<TaskListType[]>(taskList);
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('activeCategory') || taskList[0]?.name || '';
    }
    return '';
  });

  const openModal = useModalStore((state) => state.openModal);

  useEffect(() => {
    if (taskList) {
      setCategories(taskList);
    }

    if (activeCategory) {
      localStorage.setItem('activeCategory', activeCategory);
    }
  }, [taskList, activeCategory]);

  const toggleTask = (categoryName: string, id: number) => {
    setCategories(
      categories.map((category) =>
        category.name === categoryName
          ? {
              ...category,
              tasks: category.tasks.map((task) =>
                task.id === id
                  ? {
                      ...task,
                      doneAt: task.doneAt ? null : new Date().toISOString(),
                    }
                  : task,
              ),
            }
          : category,
      ),
    );
  };

  const editTask = (categoryName: string, value: string, id: number) => {
    setCategories(
      categories.map((category) =>
        category.name === categoryName
          ? {
              ...category,
              tasks: category.tasks.map((task) =>
                task.id === id ? { ...task, text: value } : task,
              ),
            }
          : category,
      ),
    );
  };

  const deleteTask = (categoryName: string, id: number) => {
    setCategories(
      categories.map((category) =>
        category.name === categoryName
          ? {
              ...category,
              tasks: category.tasks.filter((task) => task.id !== id),
            }
          : category,
      ),
    );
  };

  const handleDatePickerModal = () => {
    openModal((close) => <DatePicker close={close} />);
  };

  return (
    <div className="mt-6 w-full sm:mt-4">
      <div className="mb-[22px] flex gap-4">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`font-medium-16 relative ${
              activeCategory === category.name
                ? 'text-text-tertiary'
                : 'text-text-default'
            }`}
          >
            {category.name}
            {activeCategory === category.name && (
              <span
                className="absolute bottom-[-5px] left-0 h-[1px] w-full rounded-[1.5px] bg-text-tertiary"
                style={{ transform: 'translateY(1px)' }}
              />
            )}
          </button>
        ))}
      </div>
      <div>
        {categories.map((category) =>
          activeCategory === category.name ? (
            <div key={category.name} className="mb-8">
              <div className="flex flex-col gap-4">
                {category.tasks.map(({ id, doneAt, ...task }) => (
                  <TaskItem
                    {...task}
                    id={id}
                    key={id}
                    completed={!!doneAt}
                    onToggle={() => toggleTask(category.name, id)}
                    onEdit={(value) => editTask(category.name, value, id)}
                    onDelete={() => deleteTask(category.name, id)}
                  />
                ))}
              </div>
            </div>
          ) : null,
        )}
      </div>
      <div className="fixed bottom-12 right-7 sm:bottom-[38px] md:bottom-6 md:right-6 md:flex md:justify-end lg:right-[calc((100vw-1200px)/2)]">
        <Button
          appearance="floating-solid"
          className="w-[125px]"
          onClick={handleDatePickerModal}
        >
          + 할 일 추가
        </Button>
      </div>
    </div>
  );
};

export default TaskList;
