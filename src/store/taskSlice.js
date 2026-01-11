// src/store/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config/Config";

// -----------------------------------------------------
// FETCH ALL TASKS
// -----------------------------------------------------
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/tasks`);
      return res.data.data || res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load tasks");
    }
  }
);

// -----------------------------------------------------
// FETCH SINGLE TASK
// -----------------------------------------------------
export const fetchTask = createAsyncThunk(
  "tasks/fetchTask",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/tasks/${id}`);
      return res.data.data || res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load task");
    }
  }
);

// -----------------------------------------------------
// ADD TASK (multipart)
// -----------------------------------------------------
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/admin/tasks`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create task");
    }
  }
);

// -----------------------------------------------------
// UPDATE TASK
// (Laravel PUT with multipart requires _method override)
// -----------------------------------------------------
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      data.append("_method", "PUT");

      const res = await axios.post(
        `${API_URL}/admin/tasks/${id}`,
        data
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update task");
    }
  }
);

// -----------------------------------------------------
// DELETE TASK
// -----------------------------------------------------
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/admin/tasks/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete task");
    }
  }
);

// -----------------------------------------------------
// REDUX SLICE
// -----------------------------------------------------
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    task: null,
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    clearTaskState: (state) => {
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // ---------------------------
      // FETCH ALL TASKS
      // ---------------------------
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------------------
      // FETCH ONE TASK
      // ---------------------------
      .addCase(fetchTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------------------
      // ADD TASK
      // ---------------------------
      .addCase(addTask.fulfilled, (state) => {
        state.success = true;
      })

      // ---------------------------
      // UPDATE TASK
      // ---------------------------
      .addCase(updateTask.fulfilled, (state) => {
        state.success = true;
      })

      // ---------------------------
      // DELETE TASK
      // ---------------------------
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.list = state.list.filter((task) => task.id !== action.payload);
      });
  },
});

// Exports
export const { clearTaskState } = taskSlice.actions;
export default taskSlice.reducer;
