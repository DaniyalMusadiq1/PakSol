import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config/Config";

/* =========================================================
   🔹 ASYNC THUNKS
========================================================= */

/* 🔹 FETCH ALL USERS (ADMIN) */
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  }
);

/* 🔹 FETCH SINGLE USER */
export const fetchUserById = createAsyncThunk(
  "users/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/users/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  }
);

/* 🔹 ADD USER (ADMIN) */
export const addUser = createAsyncThunk(
  "users/create",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/admin/create-user`, userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add user");
    }
  }
);

export const telegramAuth = createAsyncThunk(
  "users/telegramAuth",
  async (telegramData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/admin/auth/telegram`,
        telegramData
      );
      return {
        ...res.data.user,
        token: res.data.token,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Auth failed");
    }
  }
);

/* 🔹 UPDATE USER */
export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/admin/users/${id}`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update user");
    }
  }
);

/* 🔹 DELETE USER */
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/admin/users/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete user");
    }
  }
);

/* =========================================================
   🔹 SLICE
========================================================= */

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [], // all users
    selectedUser: null, // single user
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    clearUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },

    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },

    // NEW: Update user coins and gems after mining collection
    updateUserCoins: (state, action) => {
      if (state.selectedUser) {
        state.selectedUser.total_coins = action.payload.total_coins;
        state.selectedUser.total_gems = action.payload.total_gems;
        state.selectedUser.total_diamonds = action.payload.total_diamonds;
      }
    },

    // NEW: Update user PPH when upgraded
    updateUserPPH: (state, action) => {
      if (state.selectedUser) {
        state.selectedUser.PPH = action.payload.PPH;
      }
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= FETCH USERS ================= */
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= FETCH USER ================= */
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= ADD USER ================= */
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.list.unshift(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= UPDATE USER ================= */
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.list = state.list.map((u) =>
          u.id === action.payload.id ? action.payload : u
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= DELETE USER ================= */
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((u) => u.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(telegramAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(telegramAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(telegramAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* =========================================================
   🔹 EXPORTS
========================================================= */

export const { clearUserState, clearSelectedUser, updateUserCoins, updateUserPPH } = usersSlice.actions;
export default usersSlice.reducer;