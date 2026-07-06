import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiroutes";

export const updateLocation =
  async (data) => {
    const response =
      await axiosInstance.put(
        API_ROUTES.AUTH.LOCATION,
        data,
        {
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

    return response.data;
  };

export const updateLanguage = async (language) => {
  try {
    console.log("Sending Language:", language);

    const response = await axiosInstance.put(
      API_ROUTES.AUTH.LANGUAGE,
      {
        preferred_language: language,
      }
    );

    console.log("Response:", response.data);

    return response.data;
  } catch (error) {
  console.log("Status:", error.response?.status);
  console.log("Full Response:", JSON.stringify(error.response?.data, null, 2));
  throw error;
}
};

  export const searchNews = async (
  keyword
) => {
  const response =
    await axiosInstance.get(
      API_ROUTES.SEARCH.NEWS(
        keyword
      )
    );

  return response.data;
};