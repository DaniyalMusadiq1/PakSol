import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config/Config";

/* =========================================================
   🔹 ASYNC THUNKS
========================================================= */

/* 🔹 FETCH ALL TASK CATEGORIES */
export const fetchTaskCategories = createAsyncThunk(
  "taskCategories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/task-categories`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch task categories"
      );
    }
  }
);

/* 🔹 FETCH SINGLE TASK CATEGORY */
export const fetchTaskCategoryById = createAsyncThunk(
  "taskCategories/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/task-categories/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch task category"
      );
    }
  }
);

/* 🔹 ADD TASK CATEGORY */
export const addTaskCategory = createAsyncThunk(
  "taskCategories/create",
  async (categoryData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/admin/task-categories`,
        categoryData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to add task category"
      );
    }
  }
);

/* 🔹 UPDATE TASK CATEGORY */
export const updateTaskCategory = createAsyncThunk(
  "taskCategories/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      // If data is FormData, use it directly
      const formData = data instanceof FormData ? data : new FormData();

      const res = await axios.post(
        `${API_URL}/admin/task-categories/${id}?_method=PUT`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return res.data.data; // return only the updated category
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update task category"
      );
    }
  }
);

/* 🔹 DELETE TASK CATEGORY */
export const deleteTaskCategory = createAsyncThunk(
  "taskCategories/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/admin/task-categories/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete task category"
      );
    }
  }
);

/* =========================================================
   🔹 SLICE
========================================================= */

const taskCategorySlice = createSlice({
  name: "taskCategories",
  initialState: {
    list: [], // all task categories
    selectedCategory: null, // single task category
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    clearCategoryState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },

    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= FETCH CATEGORIES ================= */
      .addCase(fetchTaskCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTaskCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= FETCH CATEGORY ================= */
      .addCase(fetchTaskCategoryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTaskCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
      })
      .addCase(fetchTaskCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= ADD CATEGORY ================= */
      .addCase(addTaskCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(addTaskCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.list.unshift(action.payload); // Add to beginning
      })
      .addCase(addTaskCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= UPDATE CATEGORY ================= */
      .addCase(updateTaskCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateTaskCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.list = state.list.map((cat) =>
          cat.id === action.payload.id ? action.payload : cat
        );
      })
      .addCase(updateTaskCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= DELETE CATEGORY ================= */
      .addCase(deleteTaskCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTaskCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((cat) => cat.id !== action.payload);
      })
      .addCase(deleteTaskCategory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Delete failed";
      });
  },
});

/* =========================================================
   🔹 EXPORTS
========================================================= */

export const { clearCategoryState, clearSelectedCategory } =
  taskCategorySlice.actions;
export default taskCategorySlice.reducer;
