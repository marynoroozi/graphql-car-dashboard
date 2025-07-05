import * as yup from "yup";

export const carValidationSchema = yup.object({
  make: yup
    .string()
    .required("Make is required")
    .min(2, "Make must be at least 2 characters")
    .max(50, "Make must be less than 50 characters")
    .matches(
      /^[a-zA-Z\s-]+$/,
      "Make can only contain letters, spaces, and hyphens"
    ),

  model: yup
    .string()
    .required("Model is required")
    .min(1, "Model must be at least 1 character")
    .max(50, "Model must be less than 50 characters"),

  year: yup
    .number()
    .required("Year is required")
    .min(1900, "Year must be 1900 or later")
    .max(
      new Date().getFullYear() + 1,
      `Year cannot be later than ${new Date().getFullYear() + 1}`
    )
    .integer("Year must be a whole number"),

  color: yup
    .string()
    .required("Color is required")
    .min(2, "Color must be at least 2 characters")
    .max(30, "Color must be less than 30 characters"),

  mobile: yup
    .string()
    .url("Must be a valid URL")
    .optional()
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  tablet: yup
    .string()
    .url("Must be a valid URL")
    .optional()
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  desktop: yup
    .string()
    .url("Must be a valid URL")
    .optional()
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  description: yup
    .string()
    .optional()
    .max(500, "Description must be less than 500 characters"),

  price: yup
    .number()
    .optional()
    .nullable()
    .min(0, "Price cannot be negative")
    .max(10000000, "Price seems unreasonably high")
    .transform((value) => (value === 0 ? null : value)),

  mileage: yup
    .number()
    .optional()
    .nullable()
    .min(0, "Mileage cannot be negative")
    .max(1000000, "Mileage seems unreasonably high")
    .transform((value) => (value === 0 ? null : value)),
});

export type CarFormData = yup.InferType<typeof carValidationSchema>;
