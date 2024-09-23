import notificationData from '@/data/notificationData';
import { useState } from 'react';

interface NotificationProps {
  isAdmin: boolean;
}

export default function Notification({ isAdmin }: NotificationProps) {
  const currentUser = notificationData.users[1]; // '홍길동'을 관리자라고 가정

  // 공지 상태를 관리하는 상태값 (MockData로 공지 없음 처리)
  const [notice, setNotice] = useState(notificationData.notice.content);

  // 공지가 없고, 멤버라면 컴포넌트를 렌더링하지 않음
  if (!notice && !isAdmin) {
    return null;
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex items-center justify-between py-4 pb-4 pt-6">
        <b className="font-medium-16 text-text-primary">공지</b>
        {isAdmin && (
          <button className="font-regular-14 text-brand-primary">
            + 새로운 공지 등록하기
          </button>
        )}
      </div>

      <div className="relative flex overflow-hidden rounded-2xl bg-bg-secondary p-4">
        {notice ? (
          <div className="animate-marquee w-full whitespace-nowrap">
            <p className="font-bold-16 inline-block w-full px-4 text-text-primary">
              {notice}
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
    </div>
  );
}
