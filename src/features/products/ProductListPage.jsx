import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import {
  fetchProducts,
  selectProductStatus,
  selectProductError,
} from "./productSlice";
import {
  selectProductCategories,
  selectMaxProductPrice,
  selectFilteredProducts,
} from "./selectors";
import FilterPanel from "../../components/common/FilterPanel";
import { showSnackbar } from "../ui/uiSlice";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const status = useSelector(selectProductStatus);
  const error = useSelector(selectProductError);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts()).unwrap().catch((err) => {
        dispatch(
          showSnackbar({ message: err || "Failed to load products", severity: "error" })
        );
      });
    }
  }, [status, dispatch]);

  const maxPrice = useSelector(selectMaxProductPrice);

  const columnVisibilityModel = isSmDown
    ? { id: false, category: false, stock: false, active: false }
    : {};

  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  const categories = useSelector(selectProductCategories);

  const filtered = useSelector((state) =>
    selectFilteredProducts(state, { search, category, priceRange })
  );

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "title", headerName: "Name", flex: 1, minWidth: 200 },
    { field: "category", headerName: "Category", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      valueFormatter: (params) => `$${params.value}`,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 100,
    },
    {
      field: "active",
      headerName: "Active",
      width: 100,
      type: "boolean",
    },
  ];

  const handleRowClick = (params) => {
    navigate(`/products/${params.id}`);
  };

  return (
    <Box>
      <Typography variant="h5" mb={2} fontWeight={600}>
        Products
      </Typography>

      <FilterPanel
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        maxPrice={maxPrice}
        onClear={() => {
          setSearch("");
          setCategory(null);
          setPriceRange([0, maxPrice]);
        }}
      />

      <Paper sx={{ height: 520, p: 1, overflow: "hidden" }}>
        {status === "loading" && (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <CircularProgress />
            <Typography variant="body2" color="text.secondary">
              Loading products...
            </Typography>
          </Box>
        )}

        {status === "failed" && (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography color="error">{error}</Typography>
            <Button onClick={() => dispatch(fetchProducts())} variant="outlined">
              Retry
            </Button>
          </Box>
        )}

        {status === "succeeded" && (
          <Box sx={{ width: "100%", height: "100%", overflowX: "auto" }}>
          <DataGrid
            rows={filtered}
            columns={columns}
            columnVisibilityModel={columnVisibilityModel}
            density={isSmDown ? "compact" : "standard"}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            onRowClick={handleRowClick}
            sx={{
              minWidth: { xs: 680, md: 0 },

              border: "none",
              "& .MuiDataGrid-row:hover": {
                cursor: "pointer",
                backgroundColor: (theme) =>
                  theme.palette.action.hover,
              },
            }}
          />
        </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ProductListPage;
