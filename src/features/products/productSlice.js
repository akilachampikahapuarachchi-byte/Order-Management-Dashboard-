import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/products?limit=100");
      return res.data.products;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch products");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/products/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch product");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
     
      const res = await api.put(`/products/${id}`, updates);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update product");
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
  selectedProduct: null,
  selectedStatus: "idle",
  selectedError: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
      state.selectedStatus = "idle";
      state.selectedError = null;
    },
    locallyUpdateProduct(state, action) {
      const updated = action.payload;
      const index = state.items.findIndex((p) => p.id === updated.id);
      if (index !== -1) {
        state.items[index] = updated;
      }
      if (state.selectedProduct && state.selectedProduct.id === updated.id) {
        state.selectedProduct = updated;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.map((p) => ({
          ...p,
          active: true,
        }));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.selectedStatus = "loading";
        state.selectedError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedStatus = "succeeded";
        const product = { ...action.payload, active: true };
        state.selectedProduct = product;

        const index = state.items.findIndex((p) => p.id === product.id);
        if (index === -1) {
          state.items.push(product);
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedStatus = "failed";
        state.selectedError = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex((p) => p.id === updated.id);
        if (index !== -1) {
          state.items[index] = updated;
        }
        if (state.selectedProduct && state.selectedProduct.id === updated.id) {
          state.selectedProduct = updated;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.selectedError = action.payload;
      });
  },
});

export const { clearSelectedProduct, locallyUpdateProduct } =
  productSlice.actions;

export default productSlice.reducer;

export const selectAllProducts = (state) => state.products.items;
export const selectProductStatus = (state) => state.products.status;
export const selectProductError = (state) => state.products.error;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectSelectedProductStatus = (state) =>
  state.products.selectedStatus;
