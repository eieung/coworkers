import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '@/constants/baseUrl';

// 인증이 필요한 요청에 사용
const authAxiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// 인증 요청
authAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 인증 응답
authAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      error.message = '로그인이 필요한 서비스입니다.';
    }
    return Promise.reject(error);
  },
);

// 인증이 필요하지 않은 요청에 사용하는 인스턴스
const publicAxiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export { authAxiosInstance, publicAxiosInstance };
