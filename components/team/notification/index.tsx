import { useEffect } from 'react';
import { useNotificationAPI } from '@/hooks/useNotificationAPI';

interface NotificationProps {
  isAdmin: boolean;
  groupId: number;
}
/**
 * UI 개선 필요
 */
export default function Notification({ isAdmin, groupId }: NotificationProps) {
  const {
    state,
    fetchNotification,
    addNewNotice,
    updateNotice,
    deleteNotice,
    updateState,
  } = useNotificationAPI(groupId);

  useEffect(() => {
    fetchNotification();
  }, [groupId]);

  if (state.loading) {
    return <span>공지를 불러오는 중입니다.</span>;
  }

  if (!state.notice && !isAdmin) {
    return null;
  }

  return (
    <div className="flex flex-col overflow-hidden">
      {state.errorMessage && (
        <p className="text-red-500">{state.errorMessage}</p>
      )}
      <div className="flex items-center justify-between py-4 pb-4 pt-6">
        <b className="font-medium-16 text-text-primary">공지</b>
        {isAdmin && !state.notice && (
          <button
            className="font-regular-14 text-brand-primary"
            onClick={() => updateState({ showForm: !state.showForm })}
          >
            + 새로운 공지 등록하기
          </button>
        )}
      </div>
      {isAdmin && state.showForm && (
        <div className="mb-4">
          <textarea
            value={state.newNotice}
            onChange={(e) => updateState({ newNotice: e.target.value })}
            className="w-full rounded-md border p-2"
            placeholder="새로운 공지 내용을 입력하세요"
          />
          {state.editingNotice ? (
            <button
              className="mt-2 rounded-md bg-brand-primary p-2 text-white"
              onClick={() =>
                state.noticeId && updateNotice(state.noticeId, state.newNotice)
              }
            >
              공지 수정
            </button>
          ) : (
            <button
              className="mt-2 rounded-md bg-brand-primary p-2 text-white"
              onClick={() => addNewNotice(state.newNotice)}
            >
              공지 추가
            </button>
          )}
        </div>
      )}
      <div className="relative flex overflow-hidden rounded-2xl bg-bg-secondary p-4">
        {state.notice ? (
          <div className="animate-marquee w-full whitespace-nowrap">
            <p className="font-bold-16 inline-block w-full px-4 text-text-primary">
              {state.notice}
            </p>
          </div>
        ) : isAdmin ? (
          <div className="w-full text-center">
            <p className="font-regular-14 text-text-secondary">
              아직 공지가 없어요. 새로운 공지를 등록해보세요!
            </p>
          </div>
        ) : null}
      </div>
      {isAdmin && state.notice && (
        <div className="mt-4 flex space-x-2">
          <button
            className="rounded-md bg-yellow-500 p-2 text-white"
            onClick={() => {
              updateState({
                newNotice: state.notice || '',
                editingNotice: true,
                showForm: true,
              });
            }}
          >
            수정
          </button>
          <button
            className="rounded-md bg-red-500 p-2 text-white"
            onClick={() => state.noticeId && deleteNotice(state.noticeId)}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
