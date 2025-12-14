import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProductById,
  selectSelectedProduct,
  selectSelectedProductStatus,
  locallyUpdateProduct,
  updateProduct,
} from "./productSlice";
import ProductCard from "../../components/common/ProductCard";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import { showSnackbar } from "../ui/uiSlice";

function ProductDetailsForm({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [stock, setStock] = useState(() => String(product.stock ?? ""));
  const [active, setActive] = useState(() =>
    typeof product.active === "boolean" ? product.active : true
  );
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmSave = () => {
    setConfirmOpen(false);

    const nextStock = Number(stock);
    if (Number.isNaN(nextStock) || nextStock < 0) {
      dispatch(
        showSnackbar({
          message: "Stock must be a non-negative number",
          severity: "error",
        })
      );
      return;
    }

    const updates = { stock: nextStock, active };

    dispatch(updateProduct({ id: product.id, updates }))
      .unwrap()
      .then((updated) => {
        dispatch(locallyUpdateProduct(updated ?? { ...product, ...updates }));
        dispatch(
          showSnackbar({
            message: "Product updated successfully",
            severity: "success",
          })
        );
      })
      .catch((err) => {
        dispatch(
          showSnackbar({
            message: err || "Failed to update product",
            severity: "error",
          })
        );
      });
  };

  return (
    <>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Inventory & Status
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Stock Quantity"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            inputProps={{ min: 0 }}
            sx={{ maxWidth: 240, width: "100%" }}
          />

          <FormControlLabel
            control={
              <Switch checked={active} onChange={(e) => setActive(e.target.checked)} />
            }
            label={active ? "Active" : "Inactive"}
          />

          <Stack direction="row" spacing={2} mt={1} flexWrap="wrap">
            <Button variant="contained" onClick={() => setConfirmOpen(true)}>
              Save Changes
            </Button>
            <Button variant="text" onClick={() => navigate(-1)}>
              Back
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <ConfirmationDialog
        open={confirmOpen}
        title="Save changes?"
        description="This will update the stock quantity and active status of the product."
        onConfirm={handleConfirmSave}
        onCancel={() => setConfirmOpen(false)}
        confirmText="Save"
      />
    </>
  );
}

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(selectSelectedProduct);
  const status = useSelector(selectSelectedProductStatus);

  useEffect(() => {
    dispatch(fetchProductById(id))
      .unwrap()
      .catch((err) =>
        dispatch(
          showSnackbar({
            message: err || "Failed to load product",
            severity: "error",
          })
        )
      );
  }, [id, dispatch]);

  if (status === "loading" || !product) {
    return (
      <Box
        sx={{
          minHeight: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="body2" color="text.secondary">
          Loading product details...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Stack direction="row" spacing={2} mb={2} alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          Product Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          #{product.id}
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ProductCard product={product} />
        </Grid>
        <Grid item xs={12} md={8}>
          <ProductDetailsForm key={product.id} product={product} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetailsPage;
