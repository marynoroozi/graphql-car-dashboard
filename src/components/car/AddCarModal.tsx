import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Fade,
  CircularProgress,
} from "@mui/material";
import {
  Close as CloseIcon,
  NavigateNext as NextIcon,
  NavigateBefore as BackIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { GET_CARS } from "../../graphql/queries";
import { ADD_CAR } from "../../graphql/mutations";
import {
  carValidationSchema,
  type CarFormData,
} from "../../types/car.validation";
import { modalStyles } from "../../theme/componentStyles";

interface AddCarModalProps {
  open: boolean;
  onClose: () => void;
}

const steps = ["Basic Information", "Images", "Additional Details"];

const defaultValues: CarFormData = {
  make: "",
  model: "",
  year: new Date().getFullYear(),
  color: "",
  mobile: "",
  tablet: "",
  desktop: "",
  description: "",
  price: undefined,
  mileage: undefined,
};

export default function AddCarModal({ open, onClose }: AddCarModalProps) {
  const [activeStep, setActiveStep] = useState(0);

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<CarFormData>({
    resolver: yupResolver(carValidationSchema) as any,
    defaultValues,
    mode: "onChange",
  });

  const [addCarMutation, { loading: mutationLoading }] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: GET_CARS }],
    onCompleted: (data) => {
      if (data.addCar.success) {
        toast.success("🚗 Car added successfully!", {
          duration: 3000,
        });
        handleClose();
      }
    },
    onError: (error) => {
      console.error("Error adding car:", error);
      toast.error("❌ Failed to add car. Please try again.", {
        duration: 4000,
      });
    },
  });

  const handleClose = () => {
    reset(defaultValues);
    setActiveStep(0);
    onClose();
  };

  const handleNext = async () => {
    const fieldsToValidate = getStepFields(activeStep);
    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      setActiveStep((prev) => prev + 1);
      toast.success(`Step ${activeStep + 1} completed!`);
    } else {
      toast.error("Please fix the errors before continuing.");
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const getStepFields = (step: number): (keyof CarFormData)[] => {
    switch (step) {
      case 0:
        return ["make", "model", "year", "color"];
      case 1:
        return ["mobile", "tablet", "desktop"];
      case 2:
        return ["description", "price", "mileage"];
      default:
        return [];
    }
  };

  const onSubmit: SubmitHandler<CarFormData> = async (data) => {
    const loadingToast = toast.loading("Adding your car...");

    try {
      const processedData = {
        ...data,
        mobile:
          data.mobile || "https://via.placeholder.com/300x200?text=No+Image",
        tablet:
          data.tablet || "https://via.placeholder.com/900x600?text=No+Image",
        desktop:
          data.desktop || "https://via.placeholder.com/1200x800?text=No+Image",
        price: data.price || undefined,
        mileage: data.mileage || undefined,
      };

      await addCarMutation({
        variables: { input: processedData },
      });

      toast.dismiss(loadingToast);
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Submit error:", error);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="make"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    label="Make"
                    error={!!errors.make}
                    helperText={errors.make?.message || "e.g., Audi"}
                    autoComplete="off"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="model"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    label="Model"
                    error={!!errors.model}
                    helperText={errors.model?.message || "e.g., A4, Q5, A6"}
                    autoComplete="off"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="year"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    label="Year"
                    type="number"
                    value={value || ""}
                    onChange={(e) => onChange(parseInt(e.target.value) || "")}
                    error={!!errors.year}
                    helperText={
                      errors.year?.message ||
                      `Between 1900 and ${new Date().getFullYear() + 1}`
                    }
                    inputProps={{
                      min: 1900,
                      max: new Date().getFullYear() + 1,
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    label="Color"
                    error={!!errors.color}
                    helperText={
                      errors.color?.message || "e.g., Red, Blue, White"
                    }
                    autoComplete="off"
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                gutterBottom
                color="text.secondary"
              >
                Car Images (Optional - placeholder will be used if empty)
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="mobile"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Mobile Image URL"
                    error={!!errors.mobile}
                    helperText={
                      errors.mobile?.message || "Recommended: 300px width"
                    }
                    placeholder="https://example.com/car-mobile.jpg"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="tablet"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Tablet Image URL"
                    error={!!errors.tablet}
                    helperText={
                      errors.tablet?.message || "Recommended: 900px width"
                    }
                    placeholder="https://example.com/car-tablet.jpg"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="desktop"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Desktop Image URL"
                    error={!!errors.desktop}
                    helperText={
                      errors.desktop?.message || "Recommended: 1200px+ width"
                    }
                    placeholder="https://example.com/car-desktop.jpg"
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    error={!!errors.description}
                    helperText={
                      errors.description?.message ||
                      "Describe the car's features, condition, etc."
                    }
                    inputProps={{ maxLength: 500 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="price"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Price (USD)"
                    type="number"
                    value={value || ""}
                    onChange={(e) =>
                      onChange(parseFloat(e.target.value) || undefined)
                    }
                    error={!!errors.price}
                    helperText={errors.price?.message || "Sale price in USD"}
                    inputProps={{ min: 0, step: "0.01" }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="mileage"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Mileage (KM)"
                    type="number"
                    value={value || ""}
                    onChange={(e) =>
                      onChange(parseInt(e.target.value) || undefined)
                    }
                    error={!!errors.mileage}
                    helperText={
                      errors.mileage?.message || "Total kilometers driven"
                    }
                    inputProps={{ min: 0 }}
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { ...modalStyles.dialogPaper } }}
    >
      <DialogTitle sx={modalStyles.dialogTitle}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
          Add New Car
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pb: 1 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Fade in key={activeStep} timeout={300}>
          <Box sx={{ minHeight: 300 }}>{renderStepContent(activeStep)}</Box>
        </Fade>
      </DialogContent>

      <DialogActions sx={modalStyles.dialogActions}>
        <Button
          type="button"
          onClick={handleBack}
          disabled={activeStep === 0}
          startIcon={<BackIcon />}
        >
          Back
        </Button>

        <Box sx={{ flex: 1 }} />

        {activeStep === steps.length - 1 ? (
          <Button
            type="button"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || mutationLoading}
            startIcon={
              isSubmitting || mutationLoading ? (
                <CircularProgress size={20} />
              ) : (
                <AddIcon />
              )
            }
            size="large"
          >
            {isSubmitting || mutationLoading ? "Adding..." : "Add Car"}
          </Button>
        ) : (
          <Button
            type="button"
            variant="contained"
            onClick={handleNext}
            endIcon={<NextIcon />}
            size="large"
          >
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
