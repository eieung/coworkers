import useModalStore from '@/store/useModalStore';
import Task from './Task';
import TaskListForm from '@/components/common/modal/TaskListForm';
import { useGroupsQuery } from '@/queries/group/group';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store/authStore';
import { useUsersQuery } from '@/queries/user/user';
import {
  reOrderTaskListMutation,
  useCreateTaskListMutation,
} from '@/queries/task-list/task-list';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';

export default function TaskList() {
  const router = useRouter();
  const { groupId } = router.query;

  const {
    data: groupResponse,
    isLoading,
    error,
  } = useGroupsQuery(groupId as string);

  const groupData = groupResponse?.data;
  const { accessToken } = useUserStore();
  const { data: userData } = useUsersQuery(accessToken);

  const isAdmin =
    groupData && userData
      ? groupData.members.some(
          (member) =>
            member.userId === userData.data.id && member.role === 'ADMIN',
        )
      : false;

  const openModal = useModalStore((state) => state.openModal);
  const createTaskListMutation = useCreateTaskListMutation(groupId as string);
  const [taskLists, setTaskLists] = useState(groupData?.taskLists || []);

  const reorderTaskListMutation = reOrderTaskListMutation();

  useEffect(() => {
    if (groupData) {
      setTaskLists(groupData.taskLists);
    }
  }, [groupData]);

  if (isLoading) {
    return <div>스켈레톤 구현 해야 함</div>;
  }

  if (error) {
    return <div>에러 처리 해야 함</div>;
  }

  const handleCreateTaskList = () => {
    openModal((close) => (
      <TaskListForm
        close={close}
        onAction={(value) => {
          createTaskListMutation.mutate(
            { name: value },
            {
              onSuccess: () => {
                console.log('새로운 목록 생성됨:', value);
              },
              onError: (error) => {
                console.error('목록 생성 중 오류 발생:', error);
              },
            },
          );
        }}
      />
    ));
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.index === source.index) return;

    const reorderedTaskLists = Array.from(taskLists);
    const [removed] = reorderedTaskLists.splice(source.index, 1);
    reorderedTaskLists.splice(destination.index, 0, removed);

    setTaskLists(reorderedTaskLists);

    reorderTaskListMutation.mutate({
      groupId: groupId as string,
      taskListId: draggableId,
      data: { displayIndex: destination.index },
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between py-4 pb-4 pt-6">
        <div className="flex gap-x-2">
          <b className="font-medium-16 text-text-primary">할 일 목록</b>
          <span className="font-regular-16 text-text-default">
            ({taskLists.length}개)
          </span>
        </div>
        {isAdmin && (
          <button
            className="font-regular-14 text-brand-primary"
            onClick={handleCreateTaskList}
          >
            + 새로운 목록 추가하기
          </button>
        )}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="task-lists" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {taskLists.length === 0 ? (
                <p className="font-medium-14 py-6 text-center text-text-default">
                  아직 할 일 목록이 없습니다.
                </p>
              ) : (
                taskLists.map((taskList, index) => {
                  const totalTasks = taskList.tasks.length;
                  const completedTasks = taskList.tasks.filter(
                    (task) => task.doneAt,
                  ).length;

                  return (
                    <Draggable
                      key={taskList.id}
                      draggableId={String(taskList.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task
                            name={taskList.name}
                            totalTasks={totalTasks}
                            completedTasks={completedTasks}
                            displayIndex={taskList.displayIndex}
                            groupId={groupId as string}
                            taskListId={taskList.id}
                            isAdmin={isAdmin}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
