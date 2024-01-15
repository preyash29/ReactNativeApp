// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: "",
  token: "",
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = true;
      state.user = {
        username: action.payload.username,
        email: action.payload.email,
      };
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setLogin, setLogout, setToken } = authSlice.actions;
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
