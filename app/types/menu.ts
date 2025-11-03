export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  image?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  order: number;
}

export const defaultCategories: MenuCategory[] = [
  { id: "1", name: "Entrées", order: 1 },
  { id: "2", name: "Plats", order: 2 },
  { id: "3", name: "Desserts", order: 3 },
  { id: "4", name: "Boissons", order: 4 },
];

export const defaultMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Salade du terroir",
    description: "Salade fraîche avec produits locaux",
    price: 8.5,
    category: "Entrées",
    available: true,
  },
  {
    id: "2",
    name: "Plat du jour",
    description: "Découvrez notre suggestion quotidienne",
    price: 12.9,
    category: "Plats",
    available: true,
  },
  {
    id: "3",
    name: "Tarte maison",
    description: "Selon arrivage",
    price: 6.5,
    category: "Desserts",
    available: true,
  },
];
