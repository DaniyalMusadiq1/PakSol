import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const saveWallet = createAsyncThunk(
  "wallet/save",
  async (walletData) => {
    const res = await axios.post("/api/wallets/connect", walletData);
    return res.data;
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    data: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

export default walletSlice.reducer;
