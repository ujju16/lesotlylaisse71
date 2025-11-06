import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription - Le Sot Lyllaisse 71",
  description: "Créer un compte administrateur",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
