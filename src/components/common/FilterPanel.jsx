import {
  Paper,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Typography,
} from "@mui/material";

const FilterPanel = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  priceRange,
  onPriceRangeChange,
  maxPrice,
  onClear,
}) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", md: "center" }}
      >
        <TextField
          label="Search by name"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          fullWidth
        />
        <FormControl size="small" sx={{ minWidth: { xs: "100%", md: 160 } }}>
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            value={category || ""}
            onChange={(e) => onCategoryChange(e.target.value || null)}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack sx={{ flex: 1, minWidth: { xs: "100%", md: 240 } }}>
          <Typography variant="caption">
            Price range: ${priceRange[0]} - ${priceRange[1]}
          </Typography>
          <Slider
            size="small"
            min={0}
            max={maxPrice}
            value={priceRange}
            onChange={(_, value) => onPriceRangeChange(value)}
          />
        </Stack>
        <Button variant="outlined" size="small" onClick={onClear}>
          Clear
        </Button>
      </Stack>
    </Paper>
  );
};

export default FilterPanel;
