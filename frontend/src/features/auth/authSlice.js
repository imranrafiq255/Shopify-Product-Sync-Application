import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "../../services/apiErrorHandler";
import { loginApi } from "./loginApi";
import { loadCurrentAdminApi } from "./loadCurrentAdminApi";
import { logoutApi } from "./logoutApi";
export const login = createAsyncThunk(
  "/auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await loginApi(data);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
export const loadCurrentLoggedAdmin = createAsyncThunk(
  "/auth/loadCurrentAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await loadCurrentAdminApi();
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
export const logout = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutApi();
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    isCheckingAuth: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.admin;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loadCurrentLoggedAdmin.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(loadCurrentLoggedAdmin.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.user = action.payload.admin;
      })
      .addCase(loadCurrentLoggedAdmin.rejected, (state) => {
        state.isCheckingAuth = false;
        state.user = null;
      })

      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
