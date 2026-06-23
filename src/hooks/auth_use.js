"use client";

import { useState } from "react";
import {
  loginUser,
  registerUser,
  adminLogin,
} from "@/services/auth_service";

import { setToken } from "@/utils/Storage";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  // USER LOGIN
  const login = async (payload) => {
    try {
      setLoading(true);

      const response = await loginUser(payload);

      setToken(response.data.access_token);
      localStorage.setItem("role", "user");

      return response;
    } finally {
      setLoading(false);
    }
  };

  // USER REGISTER
  const register = async (payload) => {
    try {
      setLoading(true);

      const response = await registerUser(payload);

      return response;
    } finally {
      setLoading(false);
    }
  };

  // ADMIN LOGIN
  const adminLoginHandler = async (payload) => {
    try {
      setLoading(true);

      const response = await adminLogin(payload);

      setToken(response.access_token);
      localStorage.setItem("role", "admin");

      return response;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login,
    register,
    adminLogin: adminLoginHandler,
  };
};