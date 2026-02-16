import axiosClient from "../../services/axiosClient";

export const loginApi = async (data) => {
  const response = await axiosClient.post("/admin/sign-in", data);
  return response.data;
};
