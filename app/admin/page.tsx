"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, Box } from "@mui/material";
import { getTheme } from "@/lib/theme";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  const [stats, setStats] = useState({
    categories: 0,
    dishes: 0,
    menus: 0,
  });
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setMode((savedTheme as "light" | "dark") || "light");

    const fetchStats = async () => {
      try {
        const [categoriesRes, dishesRes, menusRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/dishes"),
          fetch("/api/menus"),
        ]);

        const categories = await categoriesRes.json();
        const dishes = await dishesRes.json();
        const menus = await menusRes.json();

        setStats({
          categories: categories.data?.length || 0,
          dishes: dishes.data?.length || 0,
          menus: menus.data?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <AdminDashboard stats={stats} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
