import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  Avatar,
  Chip,
  MenuItem,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Task as TaskIcon,
  Image as ImageIcon,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask, updateTask } from "../store/taskSlice";
import { fetchTaskCategories } from "../store/taskCategorySlice";
import { Image_URL } from "../config/Config";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const ManageTasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: tasks } = useSelector((s) => s.tasks);
  const { list: categories } = useSelector((s) => s.taskCategories);

  const [openDialog, setOpenDialog] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const [form, setForm] = useState({
    label: "",
    description: "",
    link: "",
    reward_amount: "",
    status: "active",
    type: "video",
    task_category_id: "",
    max_attempts_per_user: "",
    cooldown_minutes: "",
    requires_proof: false,
    auto_approve: false,
    expires_at: "",
    image: null,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchTaskCategories());
  }, [dispatch]);

  const handleEditOpen = (task) => {
    setEditTask(task);
    setForm({
      label: task.label,
      description: task.description || "",
      link: task.link || "",
      reward_amount: task.reward_amount || "",
      status: task.status,
      type: task.type,
      task_category_id: task.task_category_id,
      max_attempts_per_user: task.max_attempts_per_user || "",
      cooldown_minutes: task.cooldown_minutes || "",
      requires_proof: Boolean(task.requires_proof),
      auto_approve: Boolean(task.auto_approve),
      expires_at: task.expires_at ? task.expires_at.slice(0, 16) : "",
      image: null,
    });

    setPreview(task.image ? `${Image_URL}${task.image}` : "");
    setOpenDialog(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") return;

      if (typeof value === "boolean") {
        data.append(key, value ? 1 : 0);
      } else {
        data.append(key, value);
      }
    });

    if (form.image instanceof File) {
      data.append("image", form.image);
    }
    await dispatch(updateTask({ id: editTask.id, data }));
    setOpenDialog(false);
    dispatch(fetchTasks());
  };

  const handleDelete = async (id) => {
    await dispatch(deleteTask(id));
    dispatch(fetchTasks());
  };

  const formatDate = (d) => {
    try {
      return format(new Date(d), "MMM dd, yyyy HH:mm");
    } catch {
      return d;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className="text-gray-200 flex items-center gap-2">
          <TaskIcon /> Manage Tasks
        </h2>

        <Button variant="contained" onClick={() => navigate("/add-task")}>
          Add New Task
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead sx={{ background: "#000" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Image</TableCell>
              <TableCell sx={{ color: "white" }}>Label</TableCell>
              <TableCell sx={{ color: "white" }}>Category</TableCell>
              <TableCell sx={{ color: "white" }}>Reward</TableCell>
              <TableCell sx={{ color: "white" }}>Proof</TableCell>
              <TableCell sx={{ color: "white" }}>Auto Approve</TableCell>
              <TableCell sx={{ color: "white" }}>Expiry</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Created</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((task) => {
              const category = categories.find(
                (c) => c.id === task.task_category_id
              );

              return (
                <TableRow key={task.id} hover>
                  <TableCell>
                    {task.image ? (
                      <img
                        src={`${Image_URL}${task.image}`}
                        height={60}
                        width={60}
                        style={{ borderRadius: 8 }}
                      />
                    ) : (
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    )}
                  </TableCell>

                  <TableCell>{task.label}</TableCell>
                  <TableCell>{category?.label || "Unknown"}</TableCell>
                  <TableCell>{task.reward_amount}</TableCell>

                  <TableCell>
                    <Chip
                      label={task.requires_proof ? "Yes" : "No"}
                      color={task.requires_proof ? "warning" : "success"}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={task.auto_approve ? "Yes" : "No"}
                      color={task.auto_approve ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    {task.expires_at ? (
                      <Chip
                        label={formatDate(task.expires_at)}
                        color={
                          new Date(task.expires_at) < new Date()
                            ? "error"
                            : "info"
                        }
                        size="small"
                      />
                    ) : (
                      <Chip label="No Expiry" size="small" />
                    )}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={task.status}
                      color={task.status === "active" ? "success" : "error"}
                    />
                  </TableCell>

                  <TableCell>{formatDate(task.created_at)}</TableCell>

                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditOpen(task)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* EDIT DIALOG */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>Edit Task</DialogTitle>

        <DialogContent>
          {preview && (
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <img src={preview} width={120} height={120} />
            </Box>
          )}

          <Button component="label" variant="contained" fullWidth sx={{ mb: 2 }}>
            Upload Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files[0];
                setForm({ ...form, image: f });
                if (f) setPreview(URL.createObjectURL(f));
              }}
            />
          </Button>

          <TextField fullWidth margin="dense" label="Label" value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })} />

          <TextField fullWidth margin="dense" label="Description" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })} />

          <TextField fullWidth margin="dense" label="Link" value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })} />

          <TextField fullWidth margin="dense" label="Reward Amount" value={form.reward_amount}
            onChange={(e) => setForm({ ...form, reward_amount: e.target.value })} />

          <TextField select fullWidth margin="dense" label="Requires Proof"
            value={form.requires_proof ? 1 : 0}
            onChange={(e) =>
              setForm({ ...form, requires_proof: Boolean(Number(e.target.value)) })
            }>
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={0}>No</MenuItem>
          </TextField>

          <TextField select fullWidth margin="dense" label="Auto Approve"
            value={form.auto_approve ? 1 : 0}
            onChange={(e) =>
              setForm({ ...form, auto_approve: Boolean(Number(e.target.value)) })
            }>
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={0}>No</MenuItem>
          </TextField>

          <TextField type="datetime-local" fullWidth margin="dense" label="Expiry Date"
            value={form.expires_at}
            onChange={(e) => setForm({ ...form, expires_at: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageTasks;
