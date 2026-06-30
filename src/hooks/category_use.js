"use client";

import { useState } from "react";
import { getCategories } from "@/services/category_service";

export const useCategories = () => {
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      return await getCategories();
    } catch (error) {
      console.error(
        "Fetch Categories Error:",
        error.response?.data || error.message
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchCategories,
  };
};