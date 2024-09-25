import instance from '@/libs/axios';
import { GroupResponse } from '@/types/group';

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    const userStorage = localStorage.getItem('user-storage');
    if (userStorage) {
      const parsedStorage = JSON.parse(userStorage);
      return parsedStorage.state?.accessToken;
    }
  }
  return null;
};

const fetchData = async (
  url: string,
  params?: any,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' = 'GET',
  data?: any,
) => {
  const token = getAccessToken();

  try {
    const response = await instance.request({
      url,
      method,
      params,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Failed to ${method} data:`, error);
    throw error;
  }
};

// 그룹 데이터를 가져오는 함수
export const getGroup = async (id: number): Promise<GroupResponse> => {
  const url = `groups/${id}`;
  const groupData = await fetchData(url);
  return groupData;
};