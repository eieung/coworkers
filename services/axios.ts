import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '@/constants/baseUrl';
import { toast } from 'react-toastify';

// 인증이 필요한 요청에 사용
const authAxiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

/*
 * @ 설명:
 * - `authAxiosInstance`는 인증이 필요한 API 요청에 사용되는 Axios 인스턴스임.
 * - `baseURL`로 설정된 기본 URL은 `BASE_URL` 상수에서 가져옴.
 * - `timeout`은 5000ms로 설정되어 요청이 5초 이상 걸릴 경우 오류를 발생시킴.
 */

// 인증 요청 인터셉터
authAxiosInstance.interceptors.request.use(
  (config) => {
    const storedData = localStorage.getItem('user-storage');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const token = parsedData?.state?.accessToken;
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        } else {
          console.warn('토큰이 존재하지 않습니다.');
        }
      } catch (error) {
        console.error('토큰 파싱 에러:', error);
      }
    } else {
      console.warn('저장된 사용자 데이터가 없습니다.');
    }
    return config;
  },
  (error) => {
    console.error('요청 인터셉터 에러:', error);
    return Promise.reject(error);
  },
);

/*
 * @ 설명:
 * - 요청 인터셉터는 요청이 서버로 전달되기 전에 실행됨.
 * - 로컬 스토리지에서 저장된 `user-storage` 데이터를 가져와 JSON으로 파싱 후 `accessToken`을 추출함.
 * - `accessToken`이 존재하면 요청 헤더에 `Authorization`으로 토큰을 포함시킴.
 * - 토큰이 없거나 파싱 에러가 발생하면 경고 메시지 또는 에러 메시지를 출력함.
 */

authAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      error.message = '로그인이 필요한 서비스입니다.';
    }
    return Promise.reject(error);
  },
);

/*
 * @ 설명:
 * - 응답 인터셉터는 서버로부터 응답이 도착한 후 실행됨.
 * - 401 상태 코드일 경우, 로그인 필요 메시지를 설정하고 추가적인 로그아웃 처리나 로그인 리다이렉트 로직을 구현할 수 있음.
 * - 500 이상일 경우, 서버 에러 메시지를 설정하고 다시 시도할 수 있음을 알림.
 * - 그 외의 에러는 응답에서 받은 오류 메시지를 그대로 표시하거나, 기본적인 에러 메시지를 출력함.
 */

// 인증이 필요하지 않은 요청에 사용
const publicAxiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

/*
 * @ 설명:
 * - `publicAxiosInstance`는 인증이 필요하지 않은 요청에 사용됨.
 * - `authAxiosInstance`와 동일하게 `baseURL`과 `timeout`을 설정함.
 */

export { authAxiosInstance, publicAxiosInstance };
