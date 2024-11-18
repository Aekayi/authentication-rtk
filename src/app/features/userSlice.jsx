import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userCredentials) => {
    const request = await axios.post(
      `https://x8ki-letl-twmt.n7.xano.io/api:eW0rqhTG/auth/signup`,
      userCredentials
    );
    const response = await request.data;
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const request = await axios.post(
      `https://x8ki-letl-twmt.n7.xano.io/api:eW0rqhTG/auth/login`,
      userCredentials
    );
    const response = await request.data;
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.authToken;

      const response = await axios.get(
        "https://x8ki-letl-twmt.n7.xano.io/api:eW0rqhTG/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      if (action.error.message === "Request failed with status code 403") {
        state.error = "This account is already registered";
      } else {
        state.error = action.error.message;
      }
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      if (action.error.message === "Request failed with status code 500") {
        state.error = "Access Denied : Invalid email or password";
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message;
    });
  },
});
export default userSlice.reducer;
export const { setUser } = userSlice.actions;
