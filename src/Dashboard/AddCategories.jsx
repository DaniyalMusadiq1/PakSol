import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTaskCategories,
  addTaskCategory,
  updateTaskCategory,
  deleteTaskCategory,
} from "../store/taskCategorySlice";

import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Grid,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from "@mui/material";

import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Category as CategoryIcon,
  CalendarToday as CalendarIcon,
  Image as ImageIcon,
  Star as StarIcon,
} from "@mui/icons-material";

import { format } from "date-fns";
import { Image_URL } from "../config/Config";

const TaskCategories = () => {
  const dispatch = useDispatch();
  const taskCategoriesState = useSelector((state) => state.taskCategories);
  const categories = taskCategoriesState?.list || [];
  const loading = taskCategoriesState?.loading || false;
  const error = taskCategoriesState?.error || null;
  const success = taskCategoriesState?.success || false;

  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const [formData, setFormData] = useState({
    label: "",
    image: null,
    description: "",
    status: "active",
    is_featured: false,
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    dispatch(fetchTaskCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("label", formData.label);
    submitData.append("description", formData.description);
    submitData.append("status", formData.status);
    submitData.append("is_featured", formData.is_featured ? 1 : 0);

    if (formData.image instanceof File) {
      submitData.append("image", formData.image);
    }

    if (editMode && currentCategory) {
      submitData.append("_method", "PUT");

      await dispatch(
        updateTaskCategory({
          id: currentCategory.id,
          data: submitData,
        })
      );
    } else {
      await dispatch(addTaskCategory(submitData));
    }

    handleCloseDialog();
    dispatch(fetchTaskCategories());
  };

  const handleOpenAddDialog = () => {
    setEditMode(false);
    setCurrentCategory(null);
    setFormData({
      label: "",
      image: null,
      description: "",
      status: "active",
      is_featured: false,
    });
    setImagePreview("");
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (category) => {
    setEditMode(true);
    setCurrentCategory(category);

    setFormData({
      label: category.label,
      description: category.description || "",
      status: category.status,
      is_featured: category.is_featured === 1,
      image: null, // keep as null, user can upload new image
    });

    // Use your Image_URL from config instead of env
    setImagePreview(category.image ? `${Image_URL}${category.image}` : "");

    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setImagePreview("");
  };

  const handleDelete = async (id) => {
    await dispatch(deleteTaskCategory(id));
    dispatch(fetchTaskCategories());
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm");
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">
          <CategoryIcon sx={{ mr: 1 }} className="text-gray-300" />
          <p className="text-gray-300">Task Categories</p>
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
        >
          Add Category
        </Button>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {loading && categories.length === 0 ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ background: "#000" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Image</TableCell>
                <TableCell sx={{ color: "white" }}>Label</TableCell>
                <TableCell sx={{ color: "white" }}>Description</TableCell>
                <TableCell sx={{ color: "white" }}>Status</TableCell>
                {/* <TableCell sx={{ color: "white" }}>Featured</TableCell> */}
                <TableCell sx={{ color: "white" }}>Created</TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id} hover>
                  <TableCell>
                    {category.image ? (
                      <img src={`${Image_URL}${category.image}`}
                        alt={category.name}
                        height={100}
                        width={100}
                      />
                    ) : (
                      <Avatar sx={{ width: 50, height: 50 }}>
                        <ImageIcon />
                      </Avatar>
                    )}
                  </TableCell>

                  <TableCell>{category.label}</TableCell>
                  <TableCell>
                    {category.description || "No description"}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={category.status}
                      color={getStatusColor(category.status)}
                    />
                  </TableCell>
{/* 
                  <TableCell>
                    {category.is_featured ? <StarIcon color="warning" /> : "No"}
                  </TableCell> */}

                  <TableCell>
                    <CalendarIcon fontSize="small" />{" "}
                    {formatDate(category.created_at)}
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEditDialog(category)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(category.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {editMode ? "Edit Category" : "Add Category"}
          </DialogTitle>

          <DialogContent>
            <Box sx={{ textAlign: "center", mb: 2 }}>
              {imagePreview ? (
                <Avatar src={imagePreview} sx={{ width: 120, height: 120 }} />
              ) : (
                <Avatar sx={{ width: 120, height: 120 }}>
                  <ImageIcon />
                </Avatar>
              )}
            </Box>

            <Button variant="contained" component="label" fullWidth>
              Upload Image
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>

            <TextField
              fullWidth
              margin="dense"
              name="label"
              label="Category Label"
              value={formData.label}
              onChange={handleInputChange}
              required
            />

            <TextField
              fullWidth
              margin="dense"
              name="description"
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
            />

            <TextField
              fullWidth
              margin="dense"
              name="status"
              label="Status"
              select
              SelectProps={{ native: true }}
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </TextField>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editMode ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default TaskCategories;
