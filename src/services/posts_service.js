export const getMyNews = async () => {
  const response = await axiosInstance.get(
    API_ROUTES.ADMIN_NEWS.MY_NEWS
  );

  return response.data;
};