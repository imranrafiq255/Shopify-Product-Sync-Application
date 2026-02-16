import axiosClient from "../../services/axiosClient";

export const loadCurrentAdminApi = async () => {
  const response = await axiosClient.get("/admin/load-current-logged-admin");
  return response.data;
};
