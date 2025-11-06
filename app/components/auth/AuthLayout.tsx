"use client";

import { Box, Container, Paper, useTheme, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useState, useEffect } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const theme = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark ? "dark" : "light";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: isDark
          ? "linear-gradient(135deg, #2D2D2D 0%, #1A1A1A 100%)"
          : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        padding: theme.spacing(2),
        transition: "background 0.3s ease",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark
            ? "radial-gradient(circle at 20% 50%, rgba(161,136,127,0.1) 0%, transparent 50%)"
            : "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
      role="main"
      aria-label="Page d'authentification"
    >
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "white",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          },
        }}
        aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      >
        {isDark ? <Brightness7 /> : <Brightness4 />}
      </IconButton>

      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={24}
            sx={{
              padding: { xs: 3, sm: 5 },
              borderRadius: 4,
              background: isDark
                ? "rgba(45, 45, 45, 0.95)"
                : "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              boxShadow: isDark
                ? "0 24px 48px rgba(0,0,0,0.5)"
                : "0 24px 48px rgba(0,0,0,0.15)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              },
            }}
          >
            {children}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
