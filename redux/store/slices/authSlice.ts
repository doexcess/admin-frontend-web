import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthStateSchema {
  access_token: string;
  refresh_token: string;
  expires_at: string;
  environment: string;
  timezone: string;
}

const initialState: AuthStateSchema = {
  access_token: '',
  refresh_token: '',
  expires_at: '',
  environment: '',
  timezone: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginState: (state, action: PayloadAction<AuthStateSchema>) => {
      return { ...state, ...action.payload };
    },
    setLogoutState: (state) => {
      return { ...initialState, access_token: '' };
    },
  },
});

export const { setLoginState, setLogoutState } = authSlice.actions;
export const authReducer = authSlice.reducer;
