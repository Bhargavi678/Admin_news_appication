import axiosInstance from "@/lib/axios";

export const getUserProfile = async () => {
  const response = await axiosInstance.get(
    "/auth/profile"
  );

  return response.data;
};

export const getAdminProfile = async () => {
  const response = await axiosInstance.get(
    "/admin/auth/profile"
  );

  return response.data;
};