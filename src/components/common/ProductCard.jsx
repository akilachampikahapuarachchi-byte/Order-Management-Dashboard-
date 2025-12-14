import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Chip,
} from "@mui/material";

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <Card elevation={2}>
      <CardMedia
        component="img"
        sx={{ height: 260, objectFit: "contain", p: 2 }}
        image={product.thumbnail || product.images?.[0]}
        alt={product.title}
      />
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={600}>
            {product.title}
          </Typography>
          <Chip
            label={product.category}
            size="small"
            sx={{ alignSelf: "flex-start" }}
          />
          <Typography variant="h5" fontWeight={700}>
            ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="body2">
            Rating: {product.rating} / 5
          </Typography>
          <Typography variant="body2">Stock: {product.stock}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
