import * as Yup from "yup";

export const loginSchema = Yup.object({
  adminEmail: Yup.string().email("Invalid email").required("Email required*"),
  adminPassword: Yup.string()
    .min(8, "Minimum 8 characters")
    .required("Password required*"),
});
