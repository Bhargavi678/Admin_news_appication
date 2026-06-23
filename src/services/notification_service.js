import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiroutes";

// GET NOTIFICATIONS

export const getNotifications =
  async () => {
    const response =
      await axiosInstance.get(
        API_ROUTES.NOTIFICATIONS.GET_ALL
      );

    return response.data;
  };

// UPDATE SETTINGS

export const updateNotificationSettings =
  async (
    notification_enabled
  ) => {
    const response =
      await axiosInstance.put(
        API_ROUTES.NOTIFICATIONS
          .UPDATE_SETTINGS,
        {
          notification_enabled,
        }
      );

    return response.data;
  };