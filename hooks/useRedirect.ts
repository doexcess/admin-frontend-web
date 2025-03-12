import { AuthStateSchema } from '@/redux/store/slices/authSlice';

export const useRedirect = (authState: AuthStateSchema) => {
  let isLoggedIn = false;
  let redirectUrl = '/sign-in';

  if (authState.access_token) {
    isLoggedIn = true;
    redirectUrl = '/';
  }

  return { isLoggedIn, redirectUrl };
};
