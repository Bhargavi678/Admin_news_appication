"use client";

import { useState } from "react";

import {
  registerUser,
  loginUser,
} from "@/services/auth_service";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  // ====================
  // REGISTER
  // ====================

  const register = async (payload) => {
    try {
      setLoading(true);

      return await registerUser(payload);
    } finally {
      setLoading(false);
    }
  };

  // ====================
  // LOGIN
  // ====================

  const login = async (payload) => {
    try {
      setLoading(true);

      return await loginUser(payload);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    register,
    login,
  };
};