"use client";

import { createTheme, PaletteMode } from "@mui/material/styles";

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#A1887F" : "#795548",
        light: "#D7CCC8",
        dark: "#4E342E",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: mode === "dark" ? "#8BC34A" : "#689F38",
        light: "#AED581",
        dark: "#33691E",
        contrastText: "#FFFFFF",
      },
      error: {
        main: "#EF5350",
      },
      warning: {
        main: "#FFA726",
      },
      info: {
        main: "#29B6F6",
      },
      success: {
        main: "#66BB6A",
      },
      background: {
        default: mode === "dark" ? "#1A1A1A" : "#FAFAFA",
        paper: mode === "dark" ? "#2D2D2D" : "#FFFFFF",
      },
      text: {
        primary: mode === "dark" ? "#FFFFFF" : "#1A1A1A",
        secondary: mode === "dark" ? "#B0B0B0" : "#666666",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: "2.5rem",
      },
      h2: {
        fontWeight: 700,
        fontSize: "2rem",
      },
      h3: {
        fontWeight: 600,
        fontSize: "1.75rem",
      },
      h4: {
        fontWeight: 600,
        fontSize: "1.5rem",
      },
      h5: {
        fontWeight: 600,
        fontSize: "1.25rem",
      },
      h6: {
        fontWeight: 600,
        fontSize: "1rem",
      },
    },
    shape: {
      borderRadius: 12,
    },
    shadows: [
      "none",
      "0px 2px 4px rgba(0,0,0,0.08)",
      "0px 4px 8px rgba(0,0,0,0.12)",
      "0px 8px 16px rgba(0,0,0,0.14)",
      "0px 12px 24px rgba(0,0,0,0.16)",
      "0px 16px 32px rgba(0,0,0,0.18)",
      "0px 20px 40px rgba(0,0,0,0.20)",
      "0px 24px 48px rgba(0,0,0,0.22)",
      "0px 28px 56px rgba(0,0,0,0.24)",
      "0px 32px 64px rgba(0,0,0,0.26)",
      "0px 36px 72px rgba(0,0,0,0.28)",
      "0px 40px 80px rgba(0,0,0,0.30)",
      "0px 44px 88px rgba(0,0,0,0.32)",
      "0px 48px 96px rgba(0,0,0,0.34)",
      "0px 52px 104px rgba(0,0,0,0.36)",
      "0px 56px 112px rgba(0,0,0,0.38)",
      "0px 60px 120px rgba(0,0,0,0.40)",
      "0px 64px 128px rgba(0,0,0,0.42)",
      "0px 68px 136px rgba(0,0,0,0.44)",
      "0px 72px 144px rgba(0,0,0,0.46)",
      "0px 76px 152px rgba(0,0,0,0.48)",
      "0px 80px 160px rgba(0,0,0,0.50)",
      "0px 84px 168px rgba(0,0,0,0.52)",
      "0px 88px 176px rgba(0,0,0,0.54)",
      "0px 92px 184px rgba(0,0,0,0.56)",
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "8px",
            padding: "10px 24px",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow:
                mode === "dark"
                  ? "0 8px 16px rgba(161,136,127,0.3)"
                  : "0 8px 16px rgba(121,85,72,0.3)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow:
                mode === "dark"
                  ? "0 12px 24px rgba(0,0,0,0.4)"
                  : "0 12px 24px rgba(0,0,0,0.15)",
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor:
                  mode === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.02)",
              },
              "&.Mui-focused": {
                backgroundColor:
                  mode === "dark"
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.04)",
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });

const theme = getTheme("light");
export default theme;
