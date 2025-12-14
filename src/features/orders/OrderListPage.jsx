import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  TableContainer,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchOrders,
  selectAllOrders,
  selectOrderStatus,
  selectOrderError,
} from "./orderSlice";
import OrderStatusBadge from "../../components/common/OrderStatusBadge";
import { showSnackbar } from "../ui/uiSlice";

const STATUSES = ["All", "Pending", "Shipped", "Delivered", "Cancelled"];

const OrderListPage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const orders = useSelector(selectAllOrders);
  const status = useSelector(selectOrderStatus);
  const error = useSelector(selectOrderError);

  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("id");
  const [orderDirection, setOrderDirection] = useState("asc");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrders())
        .unwrap()
        .catch((err) =>
          dispatch(
            showSnackbar({ message: err || "Failed to load orders", severity: "error" })
          )
        );
    }
  }, [status, dispatch]);

  const filtered = useMemo(() => {
    return orders
      .filter((o) => {
        const matchesStatus =
          statusFilter === "All" ? true : o.status === statusFilter;
        const term = search.trim().toLowerCase();
        const matchesSearch =
          !term ||
          o.customerName.toLowerCase().includes(term) ||
          String(o.id).includes(term);
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        const valA = a[orderBy];
        const valB = b[orderBy];
        if (valA < valB) return orderDirection === "asc" ? -1 : 1;
        if (valA > valB) return orderDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [orders, statusFilter, search, orderBy, orderDirection]);

  const handleSort = (field) => {
    if (orderBy === field) {
      setOrderDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setOrderBy(field);
      setOrderDirection("asc");
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={2} fontWeight={600}>
        Orders
      </Typography>

      <Paper sx={{p:2, mb: 2 }}>
        <Toolbar sx={{ gap: 2, flexWrap: "wrap", alignItems: "center", width: "100%", minHeight:"auto" }}>
          <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 180 }, flexShrink:0 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {STATUSES.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            size="small"
            label="Search by customer or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ minWidth: { xs: "100%", sm: 220 } }}
          />
        </Toolbar>
      </Paper>

      <Paper>
        {status === "loading" && (
          <Box
            sx={{
              minHeight: 240,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <CircularProgress />
            <Typography variant="body2" color="text.secondary">
              Loading orders...
            </Typography>
          </Box>
        )}

        {status === "failed" && (
          <Box
            sx={{
              minHeight: 240,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography color="error">{error}</Typography>
            <Button onClick={() => dispatch(fetchOrders())} variant="outlined">
              Retry
            </Button>
          </Box>
        )}

        {status === "succeeded" && (
          <TableContainer sx={{ maxHeight: 520, overflowX: "auto" }}>
            <Table stickyHeader size="small" sx={{ minWidth: { xs: 720, md: 0 } }}>
              <TableHead>
                <TableRow>
                  <TableCell sortDirection={orderBy === "id" ? orderDirection : false}>
                    <TableSortLabel
                      active={orderBy === "id"}
                      direction={orderBy === "id" ? orderDirection : "asc"}
                      onClick={() => handleSort("id")}
                    >
                      Order ID
                    </TableSortLabel>
                  </TableCell>
                  {!isSmDown && <TableCell>Customer</TableCell>}
                  {!isSmDown && <TableCell align="right">Items</TableCell>}
                  {!isSmDown && <TableCell align="right">Qty</TableCell>}
                  <TableCell
                    align="right"
                    sortDirection={orderBy === "total" ? orderDirection : false}
                  >
                    <TableSortLabel
                      active={orderBy === "total"}
                      direction={orderBy === "total" ? orderDirection : "asc"}
                      onClick={() => handleSort("total")}
                    >
                      Total
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((o) => (
                  <TableRow hover key={o.id}>
                    <TableCell>{o.id}</TableCell>
                    {!isSmDown && <TableCell>{o.customerName}</TableCell>}
                    {!isSmDown && <TableCell align="right">{o.totalProducts}</TableCell>}
                    {!isSmDown && <TableCell align="right">{o.totalQuantity}</TableCell>}
                    <TableCell align="right">${o.total}</TableCell>
                    <TableCell>
                      <OrderStatusBadge status={o.status} />
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={isSmDown ? 3 : 6} align="center">
                      <Typography variant="body2" color="text.secondary">
                        No orders match your filter.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default OrderListPage;
