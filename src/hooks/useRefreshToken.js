import { authApi } from "api";

const useRefreshToken = async () => {
  const refreshToken= localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const response = await authApi.refreshToken({ refreshToken });
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data.accessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
};

export default useRefreshToken;
