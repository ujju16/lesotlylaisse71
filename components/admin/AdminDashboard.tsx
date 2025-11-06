"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  useTheme,
  Chip,
  Avatar,
} from "@mui/material";
import {
  Restaurant,
  Category,
  MenuBook,
  Add,
  TrendingUp,
  Visibility,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface DashboardProps {
  stats: {
    categories: number;
    dishes: number;
    menus: number;
  };
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  link,
  delay,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  link: string;
  delay: number;
}) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -8 }}
    >
      <Card
        sx={{
          height: "100%",
          position: "relative",
          overflow: "visible",
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: 8,
          },
        }}
        onClick={() => router.push(link)}
        role="button"
        tabIndex={0}
        aria-label={`${title}: ${value} éléments`}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            router.push(link);
          }
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom
                sx={{ fontWeight: 500 }}
              >
                {title}
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 700 }}>
                {value}
              </Typography>
            </Box>
            <Avatar
              sx={{
                bgcolor: color,
                width: 56,
                height: 56,
                boxShadow: 3,
              }}
            >
              <Icon fontSize="large" />
            </Avatar>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
            <Chip
              icon={<TrendingUp />}
              label="Actif"
              size="small"
              color="success"
              variant="outlined"
            />
            <Chip
              icon={<Visibility />}
              label="Gérer"
              size="small"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function AdminDashboard({ stats }: DashboardProps) {
  const theme = useTheme();
  const router = useRouter();

  const cards = [
    {
      title: "Catégories",
      value: stats.categories,
      icon: Category,
      color: theme.palette.primary.main,
      link: "/admin/categories",
    },
    {
      title: "Plats",
      value: stats.dishes,
      icon: Restaurant,
      color: theme.palette.secondary.main,
      link: "/admin/dishes",
    },
    {
      title: "Menus",
      value: stats.menus,
      icon: MenuBook,
      color: theme.palette.info.main,
      link: "/admin/menus",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Tableau de Bord
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Gérez votre restaurant LeSotLyLaisse71
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            size="large"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
            }}
            aria-label="Créer un nouveau QR code"
            onClick={() => router.push("/admin/qrcode")}
          >
            Nouveau QR Code
          </Button>
        </Box>
      </motion.div>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        {cards.map((card, index) => (
          <StatCard key={card.title} {...card} delay={0.2 + index * 0.1} />
        ))}
      </Box>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Actions Rapides
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: 2,
                mt: 2,
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Category />}
                onClick={() => router.push("/admin/categories")}
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  borderRadius: 2,
                }}
                aria-label="Gérer les catégories"
              >
                Catégories
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Restaurant />}
                onClick={() => router.push("/admin/dishes")}
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  borderRadius: 2,
                }}
                aria-label="Gérer les plats"
              >
                Plats
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<MenuBook />}
                onClick={() => router.push("/admin/menus")}
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  borderRadius: 2,
                }}
                aria-label="Gérer les menus"
              >
                Menus
              </Button>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Add />}
                onClick={() => router.push("/admin/qrcode")}
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  borderRadius: 2,
                }}
                aria-label="Générer un QR code"
              >
                QR Code
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
