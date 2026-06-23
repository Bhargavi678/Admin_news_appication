import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiroutes";

// CREATE NEWS
export const createNews = async (data) => {
  try {
    const params = new URLSearchParams();

    Object.entries(data).forEach(
      ([key, value]) => {
        params.append(
          key,
          value ?? ""
        );
      }
    );

    const response =
      await axiosInstance.post(
        API_ROUTES.USER_POST.CREATE,
        params,
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

    return response.data;
  } catch (error) {
    console.log(
      "CREATE NEWS ERROR:",
      error.response?.data
    );

    throw (
      error.response?.data || {
        message:
          "News creation failed",
      }
    );
  }
};

// PUBLISH NEWS
export const publishNews = async (
  newsId
) => {
  try {
    const response =
      await axiosInstance.put(
        API_ROUTES.USER_POST.PUBLISH(
          newsId
        )
      );

    return response.data;
  } catch (error) {
    console.log(
      "PUBLISH ERROR:",
      error.response?.data
    );

    throw (
      error.response?.data || {
        message:
          "Publish failed",
      }
    );
  }
};

// LIST NEWS
export const getAdminNews =
  async () => {
    try {
      const response =
        await axiosInstance.get(
          API_ROUTES.USER_POST.MY_POSTS
        );

      return response.data;
    } catch (error) {
      console.log(
        "GET NEWS ERROR:",
        error.response?.data
      );

      throw (
        error.response?.data || {
          message:
            "Failed to fetch news",
        }
      );
    }
  };