import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion - Le Sot Lyllaisse 71",
  description: "Connexion à l'espace d'administration",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
