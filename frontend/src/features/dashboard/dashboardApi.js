import axiosClient from "../../services/axiosClient";

export const fetchProductsAPI = async (page = 1, search, status = "all") => {
  const response = await axiosClient.get(
    `/products/get-all-products?page=${page}&limit=10&status=${status}&search=${search}`,
  );
  return response;
};

export const createProductAPI = async (data) => {
  const response = await axiosClient.post("/products/create-product", data);
  return response;
};

export const updateProductAPI = async (id, data) => {
  const response = await axiosClient.put(
    `/products/update-product?id=${id}`,
    data,
  );
  return response;
};

export const deleteProductAPI = async (id) => {
  const response = await axiosClient.delete(
    `/products/delete-product?id=${id}`,
  );
  return response.data;
};
