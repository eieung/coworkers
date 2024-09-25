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

  return data;
};

export default loginWithSocial;
