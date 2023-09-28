import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const LoginUser = createAsyncThunk(
  'user/LoginUser',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://monkfish-app-hmwl9.ondigitalocean.app/login',
        {
          email: user.email,
          password: user.password,
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  },
);

export const GetMe = createAsyncThunk('user/GetMe', async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      'http://monkfish-app-hmwl9.ondigitalocean.app/me',
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const LogOut = createAsyncThunk('user/LogOut', async () => {
  await axios.delete('http://monkfish-app-hmwl9.ondigitalocean.app/logout');
});

export const authSlide = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //get user login

    builder.addCase(GetMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(GetMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

console.log(initialState);

export const { reset } = authSlide.actions;
export default authSlide.reducer;
