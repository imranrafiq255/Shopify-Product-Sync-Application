import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProductsAPI,
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "./dashboardApi";

export const fetchProducts = createAsyncThunk(
  "dashboard/fetchProducts",
  async ({ page = 1, search = "", status = "all" }) => {
    const response = await fetchProductsAPI(page, search, status);
    return response.data;
  },
);

export const createProduct = createAsyncThunk(
  "dashboard/createProduct",
  async (payload) => {
    const response = await createProductAPI(payload);
    return response.data;
  },
);

export const updateProduct = createAsyncThunk(
  "dashboard/updateProduct",
  async ({ id, values }) => {
    const response = await updateProductAPI(id, values);
    return response.data;
  },
);

export const deleteProduct = createAsyncThunk(
  "dashboard/deleteProduct",
  async (id) => {
    await deleteProductAPI(id);
    return id;
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    products: [],
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    search: "",
    statusFilter: "all",
    loading: false,
  },
  reducers: {
    setFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        console.log("payload ", action.payload);
        const newProduct = action.payload.product;
        state.products.unshift(newProduct);
        state.totalProducts += 1;
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload.product;
        console.log(updateProduct);
        const index = state.products.findIndex(
          (p) => p.shopifyProductId === updatedProduct.shopifyProductId,
        );

        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })

      // DELETE (already correct)
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p.shopifyProductId !== action.payload,
        );
        state.totalProducts -= 1;
      });
  },
});

export const { setFilter, setSearch } = dashboardSlice.actions;
export default dashboardSlice.reducer;
