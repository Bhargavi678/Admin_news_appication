"use client";

import { useState } from "react";

import {
  getNotifications,
  updateNotificationSettings,
} from "@/services/notification_service";

export const useNotifications =
  () => {
    const [loading, setLoading] =
      useState(false);

    const fetchNotifications =
      async () => {
        try {
          setLoading(true);

          return await getNotifications();
        } finally {
          setLoading(false);
        }
      };

    const toggleNotifications =
      async (enabled) => {
        try {
          setLoading(true);

          return await updateNotificationSettings(
            enabled
          );
        } finally {
          setLoading(false);
        }
      };

    return {
      loading,
      fetchNotifications,
      toggleNotifications,
    };
  };