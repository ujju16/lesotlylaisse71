"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Login as LoginIcon,
} from "@mui/icons-material";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { motion } from "framer-motion";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  onRegisterClick?: () => void;
}

export default function LoginForm({
  onSubmit,
  onRegisterClick,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmitForm = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await onSubmit(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de la connexion"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmitForm)} noValidate>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "primary.main",
            }}
          >
            Connexion
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Accédez à votre espace d&apos;administration
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email"
          type="email"
          autoComplete="email"
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isLoading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" aria-hidden="true" />
              </InputAdornment>
            ),
          }}
          inputProps={{
            "aria-label": "Adresse email",
            "aria-required": "true",
            "aria-invalid": !!errors.email,
            "aria-describedby": errors.email ? "email-error" : undefined,
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "&:hover": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                  borderWidth: "2px",
                },
              },
            },
          }}
        />

        <TextField
          fullWidth
          label="Mot de passe"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={isLoading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" aria-hidden="true" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  disabled={isLoading}
                  tabIndex={0}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{
            "aria-label": "Mot de passe",
            "aria-required": "true",
            "aria-invalid": !!errors.password,
            "aria-describedby": errors.password ? "password-error" : undefined,
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "&:hover": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                  borderWidth: "2px",
                },
              },
            },
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...register("rememberMe")}
                disabled={isLoading}
                inputProps={{
                  "aria-label": "Se souvenir de moi",
                }}
              />
            }
            label="Se souvenir de moi"
          />
          <Link
            href="#"
            variant="body2"
            sx={{
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Mot de passe oublié ?
          </Link>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : <LoginIcon />}
          aria-label={isLoading ? "Connexion en cours" : "Se connecter"}
          sx={{
            py: 1.5,
            textTransform: "none",
            fontSize: "1.1rem",
            fontWeight: 600,
            mb: 2,
            background: "linear-gradient(45deg, #795548 30%, #8D6E63 90%)",
            boxShadow: "0 3px 5px 2px rgba(121, 85, 72, .3)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(45deg, #6D4C41 30%, #795548 90%)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 10px 4px rgba(121, 85, 72, .3)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
          }}
        >
          {isLoading ? "Connexion..." : "Se connecter"}
        </Button>

        {onRegisterClick && (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Pas encore de compte ?{" "}
              <Link
                component="button"
                type="button"
                onClick={onRegisterClick}
                sx={{
                  textDecoration: "none",
                  fontWeight: 600,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                S&apos;inscrire
              </Link>
            </Typography>
          </Box>
        )}
      </motion.div>
    </Box>
  );
}
