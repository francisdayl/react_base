import { loginUser } from '@/api/auth';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse, UserData, UserLoginData } from '@/types/auth';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  isLoading: boolean;
}

// Set initial state
const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

// Create async thunks for API calls
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: UserLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      localStorage.setItem('auth_token', response.accessToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('auth_token');
  return null;
});

export const getToken = createAsyncThunk('auth/getToken', async () => {
  return localStorage.getItem('auth_token');
});

// Create auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          const decodedUser = jwtDecode<UserData>(action.payload.accessToken);
          state.user = decodedUser;
        }
      )
      .addCase(login.rejected, (state, _) => {
        state.user = null;
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      // Logout case
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      // Get token case
      .addCase(getToken.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(
        getToken.fulfilled,
        (state, action: PayloadAction<string | null>) => {
          const token = action.payload;
          if (token) {
            const decodedUser = jwtDecode<UserData>(token);
            state.user = decodedUser;
            state.isAuthenticated = true;
            state.isLoading = false;
          } else {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
          }
        }
      );
  },
});

export default authSlice.reducer;
