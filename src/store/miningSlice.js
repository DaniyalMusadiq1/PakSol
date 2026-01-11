import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config/Config";

/* =========================================================
   🔹 ASYNC THUNKS
========================================================= */

/* 🔹 FETCH MINING STATUS */
export const fetchMiningStatus = createAsyncThunk(
  "mining/status",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/mining/status`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch mining status"
      );
    }
  }
);

/* 🔹 START MINING */
export const startMining = createAsyncThunk(
  "mining/start",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/mining/start`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to start mining"
      );
    }
  }
);

/* 🔹 COLLECT MINING REWARD */
export const collectMining = createAsyncThunk(
  "mining/collect",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`${API_URL}/mining/collect`);
      
      // Import and dispatch user update action
      // This will update the user's coins and gems in the header
      if (res.data.user) {
        dispatch({ 
          type: 'users/updateUserCoins', 
          payload: res.data.user 
        });
      }
      
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to collect mining reward"
      );
    }
  }
);

/* =========================================================
   🔹 SLICE
========================================================= */

const miningSlice = createSlice({
  name: "mining",
  initialState: {
    isMining: false,
    startedAt: null,
    endsAt: null,
    pendingCoins: 0,

    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    clearMiningState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= FETCH STATUS ================= */
      .addCase(fetchMiningStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMiningStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isMining = action.payload.isMining;
        state.startedAt = action.payload.started_at;
        state.endsAt = action.payload.ends_at;
        state.pendingCoins = action.payload.pending_coins;
      })
      .addCase(fetchMiningStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= START MINING ================= */
      .addCase(startMining.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(startMining.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.isMining = true;
        state.startedAt = action.payload.started_at;
        state.endsAt = action.payload.ends_at;
        state.pendingCoins = 0;
      })
      .addCase(startMining.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= COLLECT MINING ================= */
      .addCase(collectMining.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(collectMining.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.isMining = false;
        state.startedAt = null;
        state.endsAt = null;
        state.pendingCoins = 0;
      })
      .addCase(collectMining.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* =========================================================
   🔹 EXPORTS
========================================================= */

export const { clearMiningState } = miningSlice.actions;
export default miningSlice.reducer;