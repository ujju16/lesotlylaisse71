"use client";

import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/lib/theme";
import type { RegisterFormData } from "@/lib/validations/auth";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (data: RegisterFormData) => {
    console.log("Register data:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  };

  const handleLoginClick = () => {
    router.push("/auth/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthLayout>
        <RegisterForm
          onSubmit={handleRegister}
          onLoginClick={handleLoginClick}
        />
      </AuthLayout>
    </ThemeProvider>
  );
}
