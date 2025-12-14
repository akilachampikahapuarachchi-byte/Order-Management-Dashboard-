import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProductListPage from "./features/products/ProductListPage";
import ProductDetailsPage from "./features/products/ProductDetailsPage";
import OrderListPage from "./features/orders/OrderListPage";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/orders" element={<OrderListPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
