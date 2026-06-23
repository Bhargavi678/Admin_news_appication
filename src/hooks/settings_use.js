"use client";

import { useState } from "react";

import {
  updateLocation,
  updateLanguage,
  searchNews,
} from "@/services/settings_service";

export const useSettings = () => {
  const [loading, setLoading] =
    useState(false);

  const changeLocation =
    async (locationData) => {
      try {
        setLoading(true);

        console.log(
          "Sending Location:",
          locationData
        );

        return await updateLocation(
          locationData
        );
      } finally {
        setLoading(false);
      }
    };

  const changeLanguage =
    async (language) => {
      try {
        setLoading(true);

        return await updateLanguage(
          language
        );
      } finally {
        setLoading(false);
      }
    };

  const handleSearchNews =
    async (keyword) => {
      try {
        setLoading(true);

        return await searchNews(
          keyword
        );
      } finally {
        setLoading(false);
      }
    };

  return {
    loading,
    changeLocation,
    changeLanguage,
    handleSearchNews,
  };
};