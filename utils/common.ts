export function formatDate(
  dateString: string | Date,
  format: 'dot' | 'korean' = 'korean',
) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  if (format === 'dot') {
    return `${year}. ${month}. ${day}`;
  }

  return `${year}년 ${month}월 ${day}일`;
}

export const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const isPM = hours >= 12;
  hours = hours % 12 || 12;
  const period = isPM ? '오후' : '오전';
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${period} ${hours}:${formattedMinutes}`;
};

export function getElapsedTime(updatedAtString: string) {
  const updatedAt = new Date(updatedAtString);
  const currentTime = new Date();

  const timeDiff = currentTime.getTime() - updatedAt.getTime();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // 24시간 이내인 경우 "몇 시간 전"으로 표시
  if (minutes < 1) {
    return '방금 전';
  } else if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  }

  // 24시간 이후부터는 날짜 형식으로 변환 (yyyy.mm.dd)
  return formatDate(updatedAtString, 'dot');
}

export const getUser = () => {
  if (typeof window !== 'undefined') {
    const userStorage = localStorage.getItem('user-storage');
    if (userStorage) {
      const parsedStorage = JSON.parse(userStorage);
      return parsedStorage.state?.user;
    }
  }
  return null;
};
