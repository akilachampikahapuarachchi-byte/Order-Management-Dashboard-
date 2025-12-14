import { createSelector } from "@reduxjs/toolkit";

export const selectAllProducts = (state) => state.products.items;
export const selectProductCategories = createSelector(
  [selectAllProducts],
  (products) => Array.from(new Set(products.map((p) => p.category))).sort()
);

export const selectMaxProductPrice = createSelector(
  [selectAllProducts],
  (products) => Math.max(100, ...products.map((p) => p.price))
);

export const selectFilteredProducts = createSelector(
  [selectAllProducts, (_, filters) => filters],
  (products, { search = "", category = null, priceRange = [0, Infinity] } = {}) => {
    const term = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesSearch = !term || p.title.toLowerCase().includes(term);
      const matchesCategory = category ? p.category === category : true;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }
);
