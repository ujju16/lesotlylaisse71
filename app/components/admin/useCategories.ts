'use client';

import { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  icon?: string;
  image?: { id: string; url: string };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (category: Omit<Category, 'id'>) => {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    const data = await res.json();
    if (data.success) {
      await fetchCategories();
      return { success: true, data: data.data };
    }
    return { success: false, error: data.error };
  };

  const updateCategory = async (id: string, category: Partial<Category>) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    const data = await res.json();
    if (data.success) {
      await fetchCategories();
      return { success: true };
    }
    return { success: false, error: data.error };
  };

  const deleteCategory = async (id: string) => {
    const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      await fetchCategories();
      return { success: true };
    }
    return { success: false, error: data.error };
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refetch: fetchCategories,
  };
}
