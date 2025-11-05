"use client";

import { Box, Container, Paper, useTheme } from "@mui/material";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        padding: theme.spacing(2),
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={8}
            sx={{
              padding: { xs: 3, sm: 5 },
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(10px)",
            }}
          >
            {children}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
