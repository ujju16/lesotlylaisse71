import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentification - Le Sot Lyllaisse 71",
  description: "Authentification pour l'espace d'administration",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
