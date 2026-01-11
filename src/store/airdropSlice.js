import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// -------------------- Async Thunks --------------------

// Fetch active airdrop
export const fetchActiveAirdrop = createAsyncThunk(
  "airdrop/fetchActive",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/airdrop/active`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch airdrop criteria
export const fetchAirdropCriteria = createAsyncThunk(
  "airdrop/fetchCriteria",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/airdrop/criteria`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// -------------------- Slice --------------------

const airdropSlice = createSlice({
  name: "airdrop",
  initialState: {
    active: null,
    criteria: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAirdropState: (state) => {
      state.active = null;
      state.criteria = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Active Airdrop
      .addCase(fetchActiveAirdrop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveAirdrop.fulfilled, (state, action) => {
        state.loading = false;
        state.active = action.payload;
      })
      .addCase(fetchActiveAirdrop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Criteria
      .addCase(fetchAirdropCriteria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAirdropCriteria.fulfilled, (state, action) => {
        state.loading = false;
        state.criteria = action.payload;
      })
      .addCase(fetchAirdropCriteria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAirdropState } = airdropSlice.actions;

export default airdropSlice.reducer;
