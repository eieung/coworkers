import loginWithSocial from '@/services/socialLogin/authApi';
import { useUserStore } from '@/store/authStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function googleAuthCallback() {
  const router = useRouter();
  const { code } = router.query;
  const { setUser, setTokens } = useUserStore();
  const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  useEffect(() => {
    const loginWithGoogle = async () => {
      if (code) {
        try {
          const response = await loginWithSocial({
            redirectUri: REDIRECT_URI,
            token: code,
            provider: 'GOOGLE',
          });
          setUser(response.data.user);
          setTokens(response.data.accessToken, response.data.refreshToken);
          router.push('/');
        } catch (error) {
          console.error('소셜 로그인 오류', error);
        }
      }
    };
    loginWithGoogle();
  }, [router]);

  return <></>;
}
