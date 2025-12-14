import { Chip } from "@mui/material";

const getColor = (status) => {
  switch (status) {
    case "Pending":
      return "warning";
    case "Shipped":
      return "info";
    case "Delivered":
      return "success";
    case "Cancelled":
      return "error";
    default:
      return "default";
  }
};

const OrderStatusBadge = ({ status }) => {
  return (
    <Chip
      label={status}
      color={getColor(status)}
      size="small"
      sx={{ fontWeight: 500, borderRadius: 999 }}
    />
  );
};

export default OrderStatusBadge;
