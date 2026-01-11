import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Button,
  TextField,
  MenuItem,
  Avatar,
  Alert,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Paper,
  InputLabel,
  FormControl,
  Select,
  Chip,
  FormHelperText,
  Divider,
} from "@mui/material";
import {
  Add as AddIcon,
  Image as ImageIcon,
  Upload as UploadIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  VerifiedUser as VerifiedUserIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../store/taskSlice";
import { useNavigate } from "react-router-dom";
import { fetchTaskCategories } from "../../store/taskCategorySlice";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Color palette for better contrast on dark theme
const colors = {
  background: "#0f172a", // Dark blue-gray
  paper: "#1e293b", // Slightly lighter blue-gray
  primary: "#3b82f6", // Blue
  success: "#10b981", // Green
  warning: "#f59e0b", // Amber
  error: "#ef4444", // Red
  info: "#8b5cf6", // Purple
  text: {
    primary: "#f8fafc", // Very light gray/white
    secondary: "#cbd5e1", // Light gray
    disabled: "#64748b", // Medium gray
  },
  border: "#334155", // Border color
  inputBg: "#1e293b", // Input background
  hover: "#2d3748", // Hover state
};

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: categories } = useSelector((s) => s.taskCategories) || {
    list: [],
  };

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
    requires_proof: "yes", // Default to "yes" for clarity
    auto_approve: false, // Default to false (manual approval)
    expires_at: null,
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchTaskCategories());
  }, [dispatch]);

  useEffect(() => {
    if (form.task_category_id && categories.length > 0) {
      const category = categories.find((c) => c.id === form.task_category_id);
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
  }, [form.task_category_id, categories]);

  const handleTypeChange = (type) => {
    setForm({ ...form, type });
  };

  const handleRequiresProofChange = (value) => {
    setForm((prev) => ({
      ...prev,
      requires_proof: value,
      auto_approve: value === "no" ? true : false, // Auto approve if no proof required
    }));
  };

  const handleAutoApproveChange = (e) => {
    setForm({ ...form, auto_approve: e.target.checked });
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setForm({ ...form, task_category_id: categoryId });
  };

  const handleDateChange = (date) => {
    setForm({ ...form, expires_at: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.task_category_id) {
      setError("Please select a category");
      return;
    }

    if (!form.label.trim()) {
      setError("Task label is required");
      return;
    }

    const formData = {
      ...form,
      requires_proof: form.requires_proof === "yes",
      expires_at: form.expires_at ? form.expires_at.toISOString() : null,
    };

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      if (typeof value === "boolean") {
        data.append(key, value ? 1 : 0);
      } else {
        data.append(key, value);
      }
    });

    await dispatch(addTask(data));
    navigate("/tasks");
  };

  // Type options with colors
  const typeOptions = [
    { value: "video", label: "Video", color: colors.primary, icon: "🎬" },
    { value: "join", label: "Join", color: colors.success, icon: "👥" },
    { value: "download", label: "Download", color: colors.warning, icon: "📥" },
    { value: "visit", label: "Visit", color: colors.info, icon: "🔗" },
    {
      value: "custom",
      label: "Custom",
      color: selectedCategory?.color || colors.text.disabled,
      icon: "⚙️",
    },
  ];

  const getCurrentTypeColor = () => {
    const currentType = typeOptions.find(
      (option) => option.value === form.type
    );
    return currentType?.color || colors.primary;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            backgroundColor: colors.paper,
            borderRadius: "12px",
            padding: { xs: "20px", sm: "24px", md: "32px" },
            color: colors.text.primary,
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              color: colors.text.primary,
              fontWeight: "600",
              fontSize: { xs: "1.75rem", md: "2rem" },
            }}
          >
            Add New Task
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                backgroundColor: "#2a1a1a",
                color: colors.error,
                "& .MuiAlert-icon": { color: colors.error },
                border: `1px solid ${colors.error}40`,
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {/* Image Upload Section */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Button
                component="label"
                sx={{
                  backgroundColor: colors.inputBg,
                  color: colors.text.secondary,
                  border: `2px dashed ${colors.border}`,
                  padding: "24px",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: colors.hover,
                    borderColor: colors.primary,
                  },
                  borderRadius: "8px",
                }}
                fullWidth
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {preview ? (
                    <Avatar
                      src={preview}
                      sx={{
                        width: 120,
                        height: 120,
                        mb: 2,
                        border: `3px solid ${colors.primary}`,
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        mb: 2,
                        backgroundColor: colors.inputBg,
                        border: `3px dashed ${colors.border}`,
                      }}
                    >
                      <UploadIcon
                        sx={{ fontSize: 40, color: colors.text.disabled }}
                      />
                    </Avatar>
                  )}
                  <Typography
                    sx={{ color: colors.text.primary, fontWeight: "500" }}
                  >
                    {preview ? "Change Task Image" : "Upload Task Image"}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: colors.text.disabled }}
                  >
                    PNG, JPG, GIF up to 5MB
                  </Typography>
                </Box>
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files[0];
                    if (f && f.size > 5 * 1024 * 1024) {
                      setError("File size must be less than 5MB");
                      return;
                    }
                    setForm({ ...form, image: f });
                    if (f) setPreview(URL.createObjectURL(f));
                    setError("");
                  }}
                />
              </Button>
            </Box>

            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    color: colors.text.primary,
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  📝 Basic Information
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Task Label *"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: colors.inputBg,
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: colors.border,
                        borderWidth: "1px",
                      },
                      "&:hover fieldset": {
                        borderColor: colors.text.secondary,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: colors.primary,
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: colors.text.secondary,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.primary,
                    },
                    "& .MuiOutlinedInput-input": {
                      color: colors.text.primary,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Task Type"
                  value={form.type}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: colors.inputBg,
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: colors.border,
                        borderWidth: "1px",
                      },
                      "&:hover fieldset": {
                        borderColor: colors.text.secondary,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: getCurrentTypeColor(),
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: colors.text.secondary,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: getCurrentTypeColor(),
                    },
                    "& .MuiSelect-icon": {
                      color: colors.text.secondary,
                    },
                  }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          backgroundColor: colors.paper,
                          color: colors.text.primary,
                          marginTop: "8px",
                          borderRadius: "8px",
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                          "& .MuiMenuItem-root": {
                            color: colors.text.primary,
                            "&:hover": {
                              backgroundColor: colors.hover,
                            },
                            "&.Mui-selected": {
                              backgroundColor: `${getCurrentTypeColor()}20`,
                              color: getCurrentTypeColor(),
                              fontWeight: "600",
                              "&:hover": {
                                backgroundColor: `${getCurrentTypeColor()}30`,
                              },
                            },
                          },
                        },
                      },
                    },
                  }}
                >
                  {typeOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{
                        color:
                          form.type === option.value
                            ? option.color
                            : colors.text.primary,
                        backgroundColor:
                          form.type === option.value
                            ? `${option.color}20`
                            : "transparent",
                        "&:hover": {
                          backgroundColor:
                            form.type === option.value
                              ? `${option.color}30`
                              : colors.hover,
                        },
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box sx={{ fontSize: "1.2rem" }}>{option.icon}</Box>
                        <Typography
                          sx={{
                            color:
                              form.type === option.value
                                ? option.color
                                : colors.text.primary,
                            fontWeight:
                              form.type === option.value ? "600" : "400",
                          }}
                        >
                          {option.label}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  multiline
                  rows={3}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: colors.inputBg,
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: colors.border,
                        borderWidth: "1px",
                      },
                      "&:hover fieldset": {
                        borderColor: colors.text.secondary,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: colors.primary,
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: colors.text.secondary,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.primary,
                    },
                    "& .MuiOutlinedInput-input": {
                      color: colors.text.primary,
                    },
                    "& .MuiOutlinedInput-textarea": {
                      color: colors.text.primary,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Task Link"
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                  placeholder="https://example.com"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: colors.inputBg,
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: colors.border,
                        borderWidth: "1px",
                      },
                      "&:hover fieldset": {
                        borderColor: colors.text.secondary,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: colors.primary,
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: colors.text.secondary,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.primary,
                    },
                    "& .MuiOutlinedInput-input": {
                      color: colors.text.primary,
                    },
                  }}
                />
              </Grid>

              {/* Category Selection */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      color: colors.text.secondary,
                      "&.Mui-focused": {
                        color: colors.primary,
                      },
                    }}
                  >
                    Select Category *
                  </InputLabel>
                  <Select
                    value={form.task_category_id}
                    onChange={handleCategoryChange}
                    label="Select Category *"
                    sx={{
                      backgroundColor: colors.inputBg,
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.border,
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.text.secondary,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary,
                        borderWidth: "2px",
                      },
                      "& .MuiSelect-select": {
                        color: colors.text.primary,
                        padding: "12px 14px",
                      },
                      "& .MuiSelect-icon": {
                        color: colors.text.secondary,
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: colors.paper,
                          color: colors.text.primary,
                          marginTop: "8px",
                          borderRadius: "8px",
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                          maxHeight: "300px",
                          "& .MuiMenuItem-root": {
                            color: colors.text.primary,
                            "&:hover": {
                              backgroundColor: colors.hover,
                            },
                            "&.Mui-selected": {
                              backgroundColor: `${colors.primary}20`,
                              "&:hover": {
                                backgroundColor: `${colors.primary}30`,
                              },
                            },
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      <Typography
                        sx={{
                          color: colors.text.disabled,
                          fontStyle: "italic",
                        }}
                      >
                        Select a category
                      </Typography>
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem
                        key={category.id}
                        value={category.id}
                        sx={{
                          color: colors.text.primary,
                          backgroundColor:
                            form.task_category_id === category.id
                              ? `${category.color || colors.primary}20`
                              : "transparent",
                          "&:hover": {
                            backgroundColor:
                              form.task_category_id === category.id
                                ? `${category.color || colors.primary}30`
                                : colors.hover,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            py: 1,
                          }}
                        >
                          <Avatar
                            src={category.image}
                            sx={{
                              width: 40,
                              height: 40,
                              backgroundColor: category.color || colors.primary,
                              border:
                                form.task_category_id === category.id
                                  ? `2px solid ${
                                      category.color || colors.primary
                                    }`
                                  : "none",
                            }}
                          >
                            {!category.image && category.label?.charAt(0)}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              sx={{
                                color:
                                  form.task_category_id === category.id
                                    ? category.color || colors.primary
                                    : colors.text.primary,
                                fontWeight:
                                  form.task_category_id === category.id
                                    ? "600"
                                    : "400",
                              }}
                            >
                              {category.label}
                              {category.is_featured && (
                                <Chip
                                  label="Featured"
                                  size="small"
                                  sx={{
                                    ml: 1,
                                    backgroundColor: colors.warning,
                                    color: colors.text.primary,
                                    fontSize: "0.7rem",
                                    height: "20px",
                                  }}
                                />
                              )}
                            </Typography>
                            {category.description && (
                              <Typography
                                variant="caption"
                                sx={{ color: colors.text.secondary }}
                              >
                                {category.description.length > 60
                                  ? category.description.substring(0, 60) +
                                    "..."
                                  : category.description}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ borderColor: colors.border, my: 2 }} />
              </Grid>

              {/* Task Settings */}
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    color: colors.text.primary,
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  ⚙️ Task Settings
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Reward Amount"
                  type="number"
                  value={form.reward_amount}
                  onChange={(e) =>
                    setForm({ ...form, reward_amount: e.target.value })
                  }
                  InputProps={{
                    inputProps: { min: 0, step: "0.01" },
                    sx: { color: colors.text.primary },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: colors.inputBg,
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: colors.border,
                        borderWidth: "1px",
                      },
                      "&:hover fieldset": {
                        borderColor: colors.text.secondary,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: colors.primary,
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: colors.text.secondary,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.primary,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Max Attempts Per User"
                  type="number"
                  value={form.max_attempts_per_user}
                  onChange={(e) =>
                    setForm({ ...form, max_attempts_per_user: e.target.value })
                  }
                  InputProps={{
                    inputProps: { min: 0 },
                    sx: { color: colors.text.primary },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: colors.inputBg,
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: colors.border,
                        borderWidth: "1px",
                      },
                      "&:hover fieldset": {
                        borderColor: colors.text.secondary,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: colors.primary,
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: colors.text.secondary,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.primary,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Cooldown (Minutes)"
                  type="number"
                  value={form.cooldown_minutes}
                  onChange={(e) =>
                    setForm({ ...form, cooldown_minutes: e.target.value })
                  }
                  InputProps={{
                    inputProps: { min: 0 },
                    sx: { color: colors.text.primary },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: colors.inputBg,
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: colors.border,
                        borderWidth: "1px",
                      },
                      "&:hover fieldset": {
                        borderColor: colors.text.secondary,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: colors.primary,
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: colors.text.secondary,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.primary,
                    },
                  }}
                />
              </Grid>

              {/* Proof Requirements Section */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 3,
                    backgroundColor: colors.inputBg,
                    borderRadius: "8px",
                    border: `1px solid ${colors.border}`,
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      color: colors.text.primary,
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    🔐 Proof & Approval Settings
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ color: colors.text.secondary }}>
                          Requires Proof Submission?
                        </InputLabel>
                        <Select
                          value={form.requires_proof}
                          onChange={(e) =>
                            handleRequiresProofChange(e.target.value)
                          }
                          label="Requires Proof Submission?"
                          sx={{
                            backgroundColor: colors.inputBg,
                            borderRadius: "8px",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: colors.border,
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: colors.text.secondary,
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor:
                                form.requires_proof === "yes"
                                  ? colors.success
                                  : colors.primary,
                              borderWidth: "2px",
                            },
                            "& .MuiSelect-select": {
                              color: colors.text.primary,
                              padding: "12px 14px",
                            },
                          }}
                        >
                          <MenuItem
                            value="yes"
                            sx={{ color: colors.text.primary }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <VerifiedUserIcon
                                sx={{ color: colors.success }}
                              />
                              <Typography>Yes - Proof Required</Typography>
                            </Box>
                          </MenuItem>
                          <MenuItem
                            value="no"
                            sx={{ color: colors.text.primary }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <CheckCircleIcon sx={{ color: colors.primary }} />
                              <Typography>No - Auto Approved</Typography>
                            </Box>
                          </MenuItem>
                        </Select>
                        <FormHelperText
                          sx={{ color: colors.text.secondary, ml: 0 }}
                        >
                          {form.requires_proof === "yes"
                            ? "Users must submit proof to complete this task"
                            : "Task completion is automatically approved without proof"}
                        </FormHelperText>
                      </FormControl>
                    </Grid>

                    {/* Auto Approve Checkbox (only visible when proof is required) */}
                    {form.requires_proof === "yes" && (
                      <Grid item xs={12} md={6}>
                        <Box
                          sx={{
                            p: 2,
                            backgroundColor: `${colors.info}10`,
                            borderRadius: "8px",
                            border: `1px solid ${colors.info}30`,
                            height: "100%",
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={form.auto_approve}
                                onChange={handleAutoApproveChange}
                                sx={{
                                  color: colors.info,
                                  "&.Mui-checked": {
                                    color: colors.info,
                                  },
                                }}
                              />
                            }
                            label={
                              <Box>
                                <Typography
                                  sx={{
                                    color: colors.text.primary,
                                    fontWeight: "500",
                                  }}
                                >
                                  Auto Approve Submissions
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: colors.text.secondary,
                                    display: "block",
                                  }}
                                >
                                  {form.auto_approve
                                    ? "✓ Submissions will be automatically approved (proof still required but auto-reviewed)"
                                    : "✗ Submissions require manual review and approval"}
                                </Typography>
                              </Box>
                            }
                          />
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Grid>

              {/* Expiration Date - Responsive */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: colors.inputBg,
                    borderRadius: "8px",
                    border: `1px solid ${colors.border}`,
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 2,
                      color: colors.text.primary,
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <ScheduleIcon sx={{ color: colors.warning }} />
                    Expiration Date (Optional)
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      "& .MuiTextField-root": {
                        width: "100%",
                      },
                    }}
                  >
                    <DateTimePicker
                      value={form.expires_at}
                      onChange={handleDateChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: colors.paper,
                              borderRadius: "6px",
                              "& fieldset": {
                                borderColor: colors.border,
                              },
                              "&:hover fieldset": {
                                borderColor: colors.text.secondary,
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: colors.warning,
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: colors.text.secondary,
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                              color: colors.warning,
                            },
                            "& .MuiInputBase-input": {
                              color: colors.text.primary,
                            },
                            "& .MuiSvgIcon-root": {
                              color: colors.text.secondary,
                            },
                          }}
                        />
                      )}
                    />
                  </Box>
                  {form.expires_at && (
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mt: 2,
                        color: colors.text.secondary,
                      }}
                    >
                      Task will expire on:{" "}
                      <strong>{form.expires_at.toLocaleString()}</strong>
                    </Typography>
                  )}
                </Box>
              </Grid>

              {/* Status */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Task Status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: colors.inputBg,
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: colors.border,
                        borderWidth: "1px",
                      },
                      "&:hover fieldset": {
                        borderColor: colors.text.secondary,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor:
                          form.status === "active"
                            ? colors.success
                            : form.status === "inactive"
                            ? colors.error
                            : colors.warning,
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: colors.text.secondary,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color:
                        form.status === "active"
                          ? colors.success
                          : form.status === "inactive"
                          ? colors.error
                          : colors.warning,
                    },
                    "& .MuiSelect-select": {
                      color:
                        form.status === "active"
                          ? colors.success
                          : form.status === "inactive"
                          ? colors.error
                          : colors.warning,
                      fontWeight: "500",
                    },
                  }}
                >
                  <MenuItem
                    value="active"
                    sx={{ color: colors.success, fontWeight: "500" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: colors.success,
                        }}
                      />
                      Active
                    </Box>
                  </MenuItem>
                  <MenuItem
                    value="inactive"
                    sx={{ color: colors.error, fontWeight: "500" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: colors.error,
                        }}
                      />
                      Inactive
                    </Box>
                  </MenuItem>
                  <MenuItem
                    value="draft"
                    sx={{ color: colors.warning, fontWeight: "500" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: colors.warning,
                        }}
                      />
                      Draft
                    </Box>
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Box
              sx={{
                mt: 5,
                pt: 3,
                borderTop: `1px solid ${colors.border}`,
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Button
                type="button"
                variant="outlined"
                onClick={() => navigate(-1)}
                sx={{
                  color: colors.text.secondary,
                  borderColor: colors.border,
                  padding: { xs: "10px 20px", sm: "12px 24px" },
                  "&:hover": {
                    borderColor: colors.text.secondary,
                    backgroundColor: `${colors.hover}80`,
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: getCurrentTypeColor(),
                  color: colors.text.primary,
                  minWidth: { xs: "100%", sm: "200px" },
                  padding: { xs: "12px 24px", sm: "14px 28px" },
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                  fontWeight: "600",
                  "&:hover": {
                    backgroundColor: getCurrentTypeColor(),
                    opacity: 0.9,
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 12px ${getCurrentTypeColor()}40`,
                  },
                }}
              >
                Create Task
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default AddTask;
