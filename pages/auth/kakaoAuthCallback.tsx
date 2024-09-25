import { useRouter } from 'next/router';
import { useUserStore } from '@/store/authStore';
import { useEffect } from 'react';
import loginWithSocial from '@/libs/socialLogin/authApi';

export default function KaKaoAuthCallback() {
  const router = useRouter();
  const { code } = router.query;
  const { setUser, setTokens } = useUserStore();
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  useEffect(() => {
    const loginWithKakao = async () => {
      if (code) {
        try {
          const response = await loginWithSocial({
            redirectUri: REDIRECT_URI,
            token: code,
            provider: 'KAKAO',
          });
          setUser(response.data.user);
          setTokens(response.data.accessToken, response.data.refreshToken);
          router.push('/');
          console.log(response);
        } catch (error) {
          console.error('소셜 로그인 오류:', error);
        }
      }
    };
    loginWithKakao();
  }, [router]);

  return <></>;
}
