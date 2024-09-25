import instance from '../axios';

interface OauthDataType {
  state?: string;
  redirectUri?: string;
  token: string | string[];
  provider?: string;
}

const loginWithSocial = async ({
  state,
  redirectUri,
  token,
  provider,
}: OauthDataType) => {
  const socialLoginData = { state, redirectUri, token };
  const data = await instance.post(`/auth/signIn/${provider}`, socialLoginData);
  // localStorage.setItem('accessToken', data.data.accessToken);
  // localStorage.setItem('refreshToken', data.data.refreshToken);
  return data;
};

export default loginWithSocial;
