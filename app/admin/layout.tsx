"use client";

import { ToastProvider } from "../components/admin/ToastProvider";
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import {
  Restaurant,
  Home,
  Category,
  MenuBook,
  QrCode2,
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getTheme } from "@/lib/theme";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setMode((savedTheme as "light" | "dark") || "light");
  }, []);

  const theme = getTheme(mode);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastProvider>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <AppBar
            position="sticky"
            elevation={2}
            sx={{
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(121, 85, 72, 0.95)",
            }}
          >
            <Toolbar>
              <Restaurant sx={{ mr: 2 }} />
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Link
                  href="/admin"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button
                    sx={{
                      color: "white",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      textTransform: "none",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                    }}
                    aria-label="Tableau de bord admin"
                  >
                    LeSotLyLaisse71 Admin
                  </Button>
                </Link>
                <Chip
                  label="BETA"
                  size="small"
                  sx={{
                    backgroundColor: "rgba(139, 195, 74, 0.9)",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              </Box>

              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                <Link
                  href="/admin/categories"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    startIcon={<Category />}
                    sx={{
                      color: "white",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                    }}
                    aria-label="Gérer les catégories"
                  >
                    Catégories
                  </Button>
                </Link>
                <Link href="/admin/dishes" style={{ textDecoration: "none" }}>
                  <Button
                    startIcon={<Restaurant />}
                    sx={{
                      color: "white",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                    }}
                    aria-label="Gérer les plats"
                  >
                    Plats
                  </Button>
                </Link>
                <Link href="/admin/menus" style={{ textDecoration: "none" }}>
                  <Button
                    startIcon={<MenuBook />}
                    sx={{
                      color: "white",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                    }}
                    aria-label="Gérer les menus"
                  >
                    Menus
                  </Button>
                </Link>
                <Link href="/admin/qrcode" style={{ textDecoration: "none" }}>
                  <Button
                    startIcon={<QrCode2 />}
                    sx={{
                      color: "white",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                    }}
                    aria-label="Générer un QR code"
                  >
                    QR Code
                  </Button>
                </Link>
              </Box>

              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  aria-label="Ouvrir le menu"
                  aria-controls="mobile-menu"
                  aria-haspopup="true"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="mobile-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      href="/admin/categories"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Category /> Catégories
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      href="/admin/dishes"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Restaurant /> Plats
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      href="/admin/menus"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <MenuBook /> Menus
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      href="/admin/qrcode"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <QrCode2 /> QR Code
                    </Link>
                  </MenuItem>
                </Menu>
              </Box>

              <IconButton
                onClick={toggleTheme}
                color="inherit"
                sx={{ ml: 2 }}
                aria-label={`Activer le mode ${mode === "light" ? "sombre" : "clair"}`}
              >
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>

              <Link href="/" style={{ textDecoration: "none" }}>
                <Button
                  startIcon={<Home />}
                  variant="outlined"
                  sx={{
                    ml: 2,
                    color: "white",
                    borderColor: "rgba(255,255,255,0.5)",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                  aria-label="Retour au site principal"
                >
                  Retour au site
                </Button>
              </Link>
            </Toolbar>
          </AppBar>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              minHeight: "calc(100vh - 64px)",
            }}
          >
            {children}
          </Box>
        </Box>
      </ToastProvider>
    </ThemeProvider>
  );
}
