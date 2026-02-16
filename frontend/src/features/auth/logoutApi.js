import axiosClient from "../../services/axiosClient";

export const logoutApi = async () => {
  const response = await axiosClient.get("/admin/logout");
  return response.data;
};
