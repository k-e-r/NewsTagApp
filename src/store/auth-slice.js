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
    loginCheck(state) {
      state.token = sessionStorage.getItem('token');
      state.localId = sessionStorage.getItem('localId');
      state.userEmail = sessionStorage.getItem('userEmail');
      state.logoutTimerId = sessionStorage.getItem('logoutTimerId');
      state.isLoggedIn = !!sessionStorage.getItem('token');
    },
    login(state, action) {
      const authData = action.payload;
      state.token = authData.token;
      state.localId = authData.localId;
      state.userEmail = authData.userEmail;
      state.logoutTimerId = authData.logoutTimerId;
      state.isLoggedIn = true;

      sessionStorage.setItem('token', authData.token);
      sessionStorage.setItem('localId', authData.localId);
      sessionStorage.setItem('userEmail', authData.userEmail);
      sessionStorage.setItem('logoutTimerId', authData.logoutTimerId);
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

      sessionStorage.clear();
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
