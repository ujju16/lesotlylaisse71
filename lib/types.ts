// Types pour l'application

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  icon?: string;
  image?: {
    id: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Dish {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  category?: Category;
  available: boolean;
  image?: {
    id: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Menu {
  id: string;
  name: string;
  slug: string;
  description?: string;
  active: boolean;
  startDate?: string;
  endDate?: string;
  dishes: Dish[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface UploadResponse {
  id: string;
  url: string;
}
