"use client";

import { useState, useEffect } from "react";
import type { Menu } from "@/lib/types";

export function useMenus() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/menus");
      const data = await res.json();
      if (data.success) {
        setMenus(data.data);
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createMenu = async (
    menu: Omit<Menu, "id" | "createdAt" | "updatedAt">
  ) => {
    const res = await fetch("/api/menus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menu),
    });
    const data = await res.json();
    if (data.success) {
      await fetchMenus();
      return { success: true, data: data.data };
    }
    return { success: false, error: data.error };
  };

  const updateMenu = async (id: string, menu: Partial<Menu>) => {
    const res = await fetch(`/api/menus/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menu),
    });
    const data = await res.json();
    if (data.success) {
      await fetchMenus();
      return { success: true };
    }
    return { success: false, error: data.error };
  };

  const deleteMenu = async (id: string) => {
    const res = await fetch(`/api/menus/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      await fetchMenus();
      return { success: true };
    }
    return { success: false, error: data.error };
  };

  const activateMenu = async (id: string) => {
    const res = await fetch(`/api/menus/${id}/activate`, { method: "POST" });
    const data = await res.json();
    if (data.success) {
      await fetchMenus();
      return { success: true };
    }
    return { success: false, error: data.error };
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return {
    menus,
    loading,
    error,
    createMenu,
    updateMenu,
    deleteMenu,
    activateMenu,
    refetch: fetchMenus,
  };
}
