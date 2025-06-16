import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  CssBaseline,
  useTheme,
} from "@mui/material";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: `
            linear-gradient(135deg, #e3f0ff 0%, #fafcff 100%),
            url('https://www.transparenttextures.com/patterns/cubes.png')
          `,
          backgroundRepeat: "repeat",
        }}
      >
        {/* Modern, attractive header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: { xs: 4, sm: 6 },
            background: "linear-gradient(90deg, #f5faff 60%, #e3f0ff 100%)",
            boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.07)",
            mb: 3,
            position: "relative",
          }}
        >
          <MenuBookRoundedIcon
            sx={{
              fontSize: { xs: 36, sm: 48 },
              color: "primary.main",
              mr: 2,
              filter: "drop-shadow(0 2px 6px rgba(25,118,210,0.10))",
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Times New Roman, Times, serif",
              fontWeight: "bold",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              letterSpacing: 2,
              background: "linear-gradient(90deg, #1976d2 40%, #64b5f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 8px rgba(25, 118, 210, 0.10)",
              display: "flex",
              alignItems: "center",
              userSelect: "none",
            }}
          >
            Address Book
          </Typography>
          {isLoggedIn && (
            <Button
              color="primary"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{
                position: "absolute",
                right: { xs: 16, sm: 32 },
                top: "50%",
                transform: "translateY(-50%)",
                fontWeight: "bold",
                borderRadius: 2,
                px: 3,
                background: "rgba(25, 118, 210, 0.10)",
                boxShadow: 1,
                fontFamily: "Times New Roman, Times, serif",
                textTransform: "none",
                "&:hover": {
                  background: "rgba(25, 118, 210, 0.18)",
                },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
        <AppBar
          position="static"
          color="primary"
          elevation={6}
          sx={{
            borderRadius: 3,
            mx: { xs: 0, sm: 2 },
            mt: 0,
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
            background: "linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            minHeight: 0,
            height: 56,
          }}
        >
          {/* Optionally keep the AppBar logout button or remove if only needed in header */}
        </AppBar>
        <Container sx={{ mt: 6, mb: 4 }}>{children}</Container>
      </Box>
    </>
  );
};

export default Layout;