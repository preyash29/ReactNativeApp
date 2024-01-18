import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI } from './authApi';

export const loginAsync = createAsyncThunk('loginUser/loginAsync', async (credentials) => {
  try {
    const response = await loginAPI(credentials);
    return response;
  } catch (error) {
    throw error;
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    username: '', // Add username property to the state
    email: '',    // Add email property to the state
    status: 'idle',
    error: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { username, email } = action.payload.data;
        console.log('Login successful:', action.payload.message);

        // Dispatch the setUserData action to update state
        loginSlice.caseReducers.setUserData(state, { payload: { username, email } });
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectLoginStatus = (state) => state.login.status;
export const selectLoginMessage = (state) => state.login.message;
export const selectUsername = (state) => state.login.username;
export const selectEmail = (state) => state.login.email;

export default loginSlice.reducer;
