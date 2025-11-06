"use client";

import { useState, useEffect } from "react";
import type { Dish } from "@/lib/types";

export function useDishes() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDishes = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/dishes");
      const data = await res.json();
      if (data.success) {
        setDishes(data.data);
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createDish = async (
    dish: Omit<Dish, "id" | "createdAt" | "updatedAt">
  ) => {
    const res = await fetch("/api/dishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dish),
    });
    const data = await res.json();
    if (data.success) {
      await fetchDishes();
      return { success: true, data: data.data };
    }
    return { success: false, error: data.error };
  };

  const updateDish = async (id: string, dish: Partial<Dish>) => {
    const res = await fetch(`/api/dishes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dish),
    });
    const data = await res.json();
    if (data.success) {
      await fetchDishes();
      return { success: true };
    }
    return { success: false, error: data.error };
  };

  const deleteDish = async (id: string) => {
    const res = await fetch(`/api/dishes/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      await fetchDishes();
      return { success: true };
    }
    return { success: false, error: data.error };
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return {
    dishes,
    loading,
    error,
    createDish,
    updateDish,
    deleteDish,
    refetch: fetchDishes,
  };
}
