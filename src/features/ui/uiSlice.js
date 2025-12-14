import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: "light",
  snackbar: {
    open: false,
    message: "",
    severity: "info",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.themeMode = state.themeMode === "light" ? "dark" : "light";
    },
    showSnackbar(state, action) {
      const { message, severity = "info" } = action.payload;
      state.snackbar = { open: true, message, severity };
    },
    hideSnackbar(state) {
      state.snackbar.open = false;
    },
  },
});

export const { toggleTheme, showSnackbar, hideSnackbar } = uiSlice.actions;
export default uiSlice.reducer;
