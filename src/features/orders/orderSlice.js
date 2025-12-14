import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const STATUSES = ["Pending", "Shipped", "Delivered", "Cancelled"];

const pickStatus = (id) => {
  return STATUSES[id % STATUSES.length];
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/carts?limit=100");
      const carts = res.data.carts || [];

      return carts.map((c) => ({
        id: c.id,
        customerName: `User ${c.userId}`,
        totalQuantity: c.totalQuantity,
        totalProducts: c.totalProducts,
        total: c.total,
        status: pickStatus(c.id),
        createdAt: new Date().toISOString(), 
      }));
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch orders");
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;

export const selectAllOrders = (state) => state.orders.items;
export const selectOrderStatus = (state) => state.orders.status;
export const selectOrderError = (state) => state.orders.error;
