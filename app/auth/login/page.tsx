"use client";

import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/lib/theme";
import type { LoginFormData } from "@/lib/validations/auth";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (data: LoginFormData) => {
    console.log("Login data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/admin");
  };

  const handleRegisterClick = () => {
    router.push("/auth/register");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthLayout>
        <LoginForm
          onSubmit={handleLogin}
          onRegisterClick={handleRegisterClick}
        />
      </AuthLayout>
    </ThemeProvider>
  );
}
