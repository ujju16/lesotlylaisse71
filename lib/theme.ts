"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#795548",
      light: "#A1887F",
      dark: "#5D4037",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#689F38",
      light: "#8BC34A",
      dark: "#558B2F",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#D32F2F",
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
      default: "#FAFAFA",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0,0,0,0.1)",
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
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});

export default theme;
