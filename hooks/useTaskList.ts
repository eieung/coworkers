import { useQuery } from '@tanstack/react-query';
import { authAxiosInstance } from '@/libs/axios';
import { TaskListType } from '@/types/taskList';

/**
 * TaskList 데이터를 가져오는 함수
 * @param groupId - 가져올 그룹의 ID
 * @param taskListId - 가져올 TaskList의 ID
 * @returns TaskList 데이터
 */
const fetchTaskList = async (
  groupId: number,
  taskListId: number,
): Promise<TaskListType> => {
  const { data } = await authAxiosInstance.get(
    `groups/${groupId}/task-lists/${taskListId}`,
  );
  return data;
};

/**
 * useTaskList 훅
 * 주어진 그룹 ID와 TaskList ID로 서버에서 TaskList 데이터를 가져오는 훅입니다.
 * @param groupId - 그룹 ID
 * @param taskListId - TaskList ID
 * @returns TaskList 데이터와 로딩/에러 상태
 */

/**
 * 상세 설명:
 *
 * 1. **queryKey**:
 *    - 캐시를 구분하기 위한 고유 키
 *    - `['taskList', groupId, taskListId]`로 설정하여 각 그룹과 TaskList ID별로 데이터를 캐싱하고 분리
 *    - 동일한 `groupId`와 `taskListId`로 여러 번 호출 시, 동일한 데이터를 캐시에서 빠르게 가져올 수 있음
 *
 * 2. **queryFn**:
 *    - 데이터를 가져오는 비동기 함수. `fetchTaskList` 함수를 호출하여 해당 `groupId`와 `taskListId`에 대한 TaskList 정보를 서버에서 가져옴
 *    - 이 함수는 React Query가 내부적으로 데이터를 요청할 때 호출
 *
 * 3. **staleTime**:
 *    - 5분이 지나기 전에는 캐시된 데이터를 그대로 사용하며, 이후에는 자동으로 새로운 데이터를 서버에서 요청
 *
 * 4. **retry**:
 *    - 데이터 요청이 실패했을 경우 재시도 횟수를 의미
 */

export const useTaskList = (groupId: number, taskListId: number) => {
  return useQuery({
    queryKey: ['taskList', groupId, taskListId],
    queryFn: () => fetchTaskList(groupId, taskListId),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
