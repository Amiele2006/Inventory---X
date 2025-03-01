import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 7000));

      // For demo purposes, we'll just check if the email is "admin@example.com"
      if (credentials.email === "admin@example.com") {
        return { name: "Admin User", email: credentials.email };
      } else {
        return rejectWithValue("Invalid credentials");
      }
    } catch (error) {
      return rejectWithValue("An error occurred. Please try again.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
