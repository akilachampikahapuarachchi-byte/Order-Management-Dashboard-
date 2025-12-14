import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import orderReducer from "../features/orders/orderSlice";
import uiReducer from "../features/ui/uiSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    orders: orderReducer,
    ui: uiReducer,
  },
});

export default store;
