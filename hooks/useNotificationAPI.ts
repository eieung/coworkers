import { useState } from 'react';

/**
 * NotificationState 인터페이스는 공지사항의 상태를 정의
 * @property notice - 현재 공지사항의 내용 (string | null)
 * @property loading - 데이터를 로딩 중인지 여부 (boolean)
 * @property showForm - 공지 등록/수정 폼 표시 여부 (boolean)
 * @property newNotice - 새로 입력한 공지 내용 (string)
 * @property editingNotice - 수정 모드 여부 (boolean)
 * @property noticeId - 현재 공지의 ID (string | null)
 * @property errorMessage - 오류 메시지 (string | null)
 */
interface NotificationState {
  notice: string | null;
  loading: boolean;
  showForm: boolean;
  newNotice: string;
  editingNotice: boolean;
  noticeId: string | null;
  errorMessage: string | null;
}

/**
 * UseNotificationAPI 인터페이스는 useNotificationAPI 훅의 반환 값 구조를 정의
 * @property state - 공지사항의 상태
 * @property fetchNotification - 공지사항을 가져오는 함수
 * @property addNewNotice - 새 공지사항을 추가하는 함수
 * @property updateNotice - 기존 공지사항을 수정하는 함수
 * @property deleteNotice - 공지사항을 삭제하는 함수
 * @property updateState - 상태를 업데이트하는 함수
 */
interface UseNotificationAPI {
  state: NotificationState;
  fetchNotification: () => Promise<void>;
  addNewNotice: (content: string) => Promise<void>;
  updateNotice: (id: string, content: string) => Promise<void>;
  deleteNotice: (id: string) => Promise<void>;
  updateState: (newState: Partial<NotificationState>) => void;
}

/**
 * fetchAPI는 주어진 URL로 요청을 보내고 응답을 처리하는 함수입니다.
 * @param url - 요청할 URL
 * @param options - 요청 옵션
 * @returns 응답 데이터
 */
const fetchAPI = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  return data;
};

/**
 * useNotificationAPI 훅은 공지사항을 관리하기 위한 로직을 제공합니다.
 * @returns UseNotificationAPI - 훅의 반환 값
 */
export function useNotificationAPI(groupId: number): UseNotificationAPI {
  const [state, setState] = useState<NotificationState>({
    notice: null,
    loading: true,
    showForm: false,
    newNotice: '',
    editingNotice: false,
    noticeId: null,
    errorMessage: null,
  });

  /**
   * updateState 함수는 상태를 업데이트합니다.
   * @param newState - 업데이트할 상태의 일부
   */
  const updateState = (newState: Partial<NotificationState>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  /**
   * fetchNotification 함수는 공지사항을 서버에서 가져옵니다.
   */
  const fetchNotification = async () => {
    updateState({ loading: true });
    try {
      const data = await fetchAPI(`/api/groups/${groupId}/notification`);

      const newState: Partial<NotificationState> = { loading: false };

      if (data.success && data.data.length > 0) {
        newState.notice = data.data[0].content;
        newState.noticeId = data.data[0]._id;
        newState.errorMessage = null;
      } else {
        newState.notice = null;
        newState.noticeId = null;
      }

      updateState(newState); // 한 번의 호출로 상태 업데이트 (리렌더링을 최소화 하기 위해)
    } catch (error) {
      console.error('공지사항을 불러오는 데 실패했습니다.', error);
      updateState({
        loading: false,
        errorMessage: '공지사항을 불러오는 데 실패했습니다.',
        notice: null,
        noticeId: null,
      });
    }
  };

  /**
   * addNewNotice 함수는 새로운 공지사항을 추가합니다.
   * @param content - 추가할 공지의 내용
   */
  const addNewNotice = async (content: string) => {
    try {
      const response = await fetch('/api/groups/${groupId}/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          groupId: groupId,
        }),
      });

      if (!response.ok) {
        throw new Error('새로운 공지 생성에 실패했습니다.');
      }

      const data = await response.json();
      updateState({
        notice: data.data.content,
        noticeId: data.data._id,
        newNotice: '',
        showForm: false,
      });
      fetchNotification()
    } catch (error) {
      console.error('공지 추가에 실패했습니다.', error);
      updateState({ errorMessage: '공지 추가에 실패했습니다.' });
    }
  };

  /**
   * updateNotice 함수는 기존 공지사항을 수정합니다.
   * @param id - 수정할 공지의 ID
   * @param content - 새 공지 내용
   */
  const updateNotice = async (id: string, content: string) => {
    try {
      const data = await fetchAPI(
        `/api/groups/${groupId}/notification?id=${encodeURIComponent(id)}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, groupId }),
        },
      );
      if (data.success) {
        await fetchNotification();
        updateState({
          showForm: false,
          newNotice: '',
          editingNotice: false,
          errorMessage: null,
        });
      }
    } catch (error) {
      console.error('공지 수정에 실패했습니다.', error);
      updateState({ errorMessage: '공지 수정에 실패했습니다.' });
    }
  };

  /**
   * deleteNotice 함수는 공지사항을 삭제합니다.
   * @param id - 삭제할 공지의 ID
   */
  const deleteNotice = async (id: string) => {
    try {
      const data = await fetchAPI(
        `/api/groups/${groupId}/notification?id=${encodeURIComponent(id)}`,
        {
          method: 'DELETE',
        },
      );
      if (data.success) {
        updateState({
          notice: null,
          noticeId: null,
          errorMessage: null,
        });
      }
    } catch (error) {
      console.error('공지 삭제에 실패했습니다.', error);
      updateState({ errorMessage: '공지 삭제에 실패했습니다.' });
    }
  };

  return {
    state,
    fetchNotification,
    addNewNotice,
    updateNotice,
    deleteNotice,
    updateState,
  };
}
