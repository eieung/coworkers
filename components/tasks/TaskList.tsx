import { useState } from 'react';
import TaskItem from './TaskItem';
import Button from '@/components/common/button';
import useModalStore from '@/store/useModalStore';
import DatePicker from '@/components/common/modal/DatePicker';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface Category {
  name: string;
  tasks: Task[];
}

const TaskList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      name: '법인 설립',
      tasks: [
        { id: 1, text: '법인 설립 안내 드리기', completed: false },
        { id: 2, text: '법인 설립 비용 견적서 작성', completed: false },
        { id: 3, text: '법인 설립 서류 준비', completed: false },
      ],
    },
    {
      name: '법인 등기',
      tasks: [
        { id: 4, text: '법인 등기 신청서 작성', completed: false },
        { id: 5, text: '등기 신청서 제출', completed: false },
        { id: 6, text: '등기 확인서 수령', completed: false },
      ],
    },
    {
      name: '정기 주총',
      tasks: [
        { id: 7, text: '정기 주총 일정 조율', completed: false },
        { id: 8, text: '정기 주총 안건 준비', completed: false },
        { id: 9, text: '주총 참석자 명단 작성', completed: false },
      ],
    },
    {
      name: '기타',
      tasks: [
        { id: 10, text: '사내 행사 준비', completed: false },
        { id: 11, text: '문서 관리 시스템 업데이트', completed: false },
        { id: 12, text: '팀 빌딩 활동 계획', completed: false },
      ],
    },
  ]);

  const openModal = useModalStore((state) => state.openModal);

  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0].name,
  );

  const toggleTask = (categoryName: string, id: number) => {
    setCategories(
      categories.map((category) =>
        category.name === categoryName
          ? {
              ...category,
              tasks: category.tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task,
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
                {category.tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    id={task.id}
                    text={task.text}
                    completed={task.completed}
                    onToggle={() => toggleTask(category.name, task.id)}
                    onEdit={(value) => editTask(category.name, value, task.id)}
                    onDelete={() => deleteTask(category.name, task.id)}
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
