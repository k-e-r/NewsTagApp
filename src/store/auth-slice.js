import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    localId: '',
    userEmail: '',
    logoutTimerId: '',
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      const authData = action.payload;
      state.token = authData.token;
      state.localId = authData.localId;
      state.userEmail = authData.userEmail;
      state.logoutTimerId = authData.logoutTimerId;
      state.isLoggedIn = true;

      localStorage.setItem('token', authData.token);
      localStorage.setItem('localId', authData.localId);
      localStorage.setItem('userEmail', authData.userEmail);
      localStorage.setItem('logoutTimerId', authData.logoutTimerId);
    },
    logout(state) {
      if (state.logoutTimerId) {
        clearTimeout(state.logoutTimerId);
      }
      state.token = null;
      state.localId = null;
      state.userEmail = null;
      state.logoutTimerId = null;
      state.isLoggedIn = false;

      localStorage.removeItem('token');
      localStorage.removeItem('localId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('logoutTimerId');
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
