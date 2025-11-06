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
  Person,
  PersonAdd,
} from "@mui/icons-material";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { motion } from "framer-motion";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  onLoginClick?: () => void;
}

export default function RegisterForm({
  onSubmit,
  onLoginClick,
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  const onSubmitForm = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await onSubmit(data);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de l'inscription"
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
            Inscription
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Créez votre compte administrateur
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Compte créé avec succès ! Vous pouvez maintenant vous connecter.
          </Alert>
        )}

        <TextField
          fullWidth
          label="Nom complet"
          type="text"
          autoComplete="name"
          margin="normal"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          disabled={isLoading || success}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          autoComplete="email"
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isLoading || success}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Mot de passe"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={isLoading || success}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
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
                  disabled={isLoading || success}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Confirmer le mot de passe"
          type={showConfirmPassword ? "text" : "password"}
          autoComplete="new-password"
          margin="normal"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          disabled={isLoading || success}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showConfirmPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                  disabled={isLoading || success}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              {...register("acceptTerms")}
              disabled={isLoading || success}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              J&apos;accepte les{" "}
              <Link href="/mentions-legales" target="_blank" rel="noopener">
                conditions d&apos;utilisation
              </Link>{" "}
              et la{" "}
              <Link href="/confidentialite" target="_blank" rel="noopener">
                politique de confidentialité
              </Link>
            </Typography>
          }
          sx={{ mb: 3 }}
        />
        {errors.acceptTerms && (
          <Typography
            variant="caption"
            color="error"
            sx={{ display: "block", mb: 2 }}
          >
            {errors.acceptTerms.message}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading || success}
          startIcon={isLoading ? <CircularProgress size={20} /> : <PersonAdd />}
          sx={{
            py: 1.5,
            textTransform: "none",
            fontSize: "1.1rem",
            fontWeight: 600,
            mb: 2,
            background: "linear-gradient(45deg, #8BC34A 30%, #689F38 90%)",
            boxShadow: "0 3px 5px 2px rgba(139, 195, 74, .3)",
            "&:hover": {
              background: "linear-gradient(45deg, #689F38 30%, #558B2F 90%)",
            },
          }}
        >
          {isLoading ? "Inscription..." : "S'inscrire"}
        </Button>

        {onLoginClick && (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Déjà un compte ?{" "}
              <Link
                component="button"
                type="button"
                onClick={onLoginClick}
                sx={{
                  textDecoration: "none",
                  fontWeight: 600,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Se connecter
              </Link>
            </Typography>
          </Box>
        )}
      </motion.div>
    </Box>
  );
}
