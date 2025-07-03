import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
} from "@mui/material";
import type { Car } from "../hooks/useCars";

interface AddCarFormProps {
  onAddCar: (car: Omit<Car, "id">) => void;
}

export function AddCarForm({ onAddCar }: AddCarFormProps) {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    color: "",
    mobile: "",
    tablet: "",
    desktop: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.make || !formData.model || !formData.color) {
      return;
    }

    // If no images provided, use placeholder
    const newCar = {
      ...formData,
      mobile:
        formData.mobile || "https://via.placeholder.com/300x200?text=No+Image",
      tablet:
        formData.tablet || "https://via.placeholder.com/900x600?text=No+Image",
      desktop:
        formData.desktop ||
        "https://via.placeholder.com/1200x800?text=No+Image",
    };

    onAddCar(newCar);

    // Reset form
    setFormData({
      make: "",
      model: "",
      year: new Date().getFullYear(),
      color: "",
      mobile: "",
      tablet: "",
      desktop: "",
    });

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Paper
      elevation={3}
      sx={{ p: 3, mb: 3 }}
      component="section"
      aria-labelledby="add-car-heading"
    >
      <Typography variant="h5" component="h2" gutterBottom id="add-car-heading">
        Add New Car
      </Typography>

      {showSuccess && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          role="alert"
          aria-live="polite"
        >
          Car added successfully!
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        aria-describedby="add-car-heading"
      >
        <Box display="flex" flexWrap="wrap" gap={2}>
          <Box
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" },
              minWidth: 200,
            }}
          >
            <TextField
              fullWidth
              required
              label="Make"
              name="make"
              value={formData.make}
              onChange={handleChange}
              placeholder="e.g., Audi, BMW, Mercedes"
              inputProps={{
                "aria-describedby": "make-help",
                maxLength: 50,
              }}
              helperText="Enter the car manufacturer"
              id="make-help"
            />
          </Box>

          <Box
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" },
              minWidth: 200,
            }}
          >
            <TextField
              fullWidth
              required
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="e.g., A4, X5, C-Class"
              inputProps={{
                "aria-describedby": "model-help",
                maxLength: 50,
              }}
              helperText="Enter the car model"
              id="model-help"
            />
          </Box>

          <Box
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" },
              minWidth: 200,
            }}
          >
            <TextField
              fullWidth
              required
              label="Year"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              inputProps={{
                min: 1900,
                max: new Date().getFullYear() + 1,
                "aria-describedby": "year-help",
              }}
              helperText={`Enter year between 1900 and ${
                new Date().getFullYear() + 1
              }`}
              id="year-help"
            />
          </Box>

          <Box
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" },
              minWidth: 200,
            }}
          >
            <TextField
              fullWidth
              required
              label="Color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="e.g., Red, Blue, White"
            />
          </Box>

          <Box sx={{ width: "100%" }}>
            <Typography
              variant="subtitle2"
              gutterBottom
              component="legend"
              id="image-section-heading"
            >
              Car Images (Optional - will use placeholder if empty)
            </Typography>
          </Box>

          <Box sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="Mobile Image URL"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Image URL for mobile devices"
              helperText="Recommended: 300px width"
            />
          </Box>

          <Box sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="Tablet Image URL"
              name="tablet"
              value={formData.tablet}
              onChange={handleChange}
              placeholder="Image URL for tablet devices"
              helperText="Recommended: 900px width"
            />
          </Box>

          <Box sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="Desktop Image URL"
              name="desktop"
              value={formData.desktop}
              onChange={handleChange}
              placeholder="Image URL for desktop devices"
              helperText="Recommended: 1200px+ width"
            />
          </Box>

          <Box sx={{ width: "100%" }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
              aria-describedby="add-car-heading"
            >
              Add Car
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
