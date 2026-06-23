"use client";

import { useState } from "react";

import {
  getUserProfile,
  getAdminProfile,
} from "@/services/profile_service";

export const useProfile = () => {
  const [loading, setLoading] =
    useState(false);

  const fetchUserProfile =
    async () => {
      try {
        setLoading(true);

        return await getUserProfile();
      } finally {
        setLoading(false);
      }
    };

  const fetchAdminProfile =
    async () => {
      try {
        setLoading(true);

        return await getAdminProfile();
      } finally {
        setLoading(false);
      }
    };

  return {
    loading,
    fetchUserProfile,
    fetchAdminProfile,
  };
};