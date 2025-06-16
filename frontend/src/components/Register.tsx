import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { auth, UserRegister } from "../services/api";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserRegister>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    // Email validation
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }
    // Password validation (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)
    ) {
      errors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await auth.register(formData);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ p: 4, mt: 10, borderRadius: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontFamily: "Times New Roman, Times, serif",
              fontWeight: "bold",
              mb: 1,
              color: "primary.main",
              letterSpacing: 1,
            }}
          >
            Sign Up
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 2 }}>
            Create your account to get started.
          </Typography>
          {error && (
            <Alert severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              error={!!fieldErrors.password}
              helperText={fieldErrors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                mb: 2,
                fontFamily: "Times New Roman, Times, serif",
                fontWeight: "bold",
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate("/login")}
              sx={{
                fontFamily: "Times New Roman, Times, serif",
                color: "primary.main",
                textTransform: "none",
              }}
            >
              Already have an account? <b>&nbsp;Sign In</b>
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;