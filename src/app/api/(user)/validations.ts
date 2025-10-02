import { z } from "zod";

export const schemas = {
  email: z.string().email("Invalid email format"),
  
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
      "Password must contain uppercase, lowercase, number and special character"),
  
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  
  loginSchema: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required")
  }),
  
  signupSchema: z.object({
    name: z.string().min(1, "Name is required").max(100, "Name too long"),
    email: z.string().email("Invalid email format"), 
    password: z.string()
      .min(6, "Password must be at least 6 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
        "Password must contain uppercase, lowercase, number and special character"),
    confirmPassword: z.string()
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  })
};

export const validatePassword = (password: string) => {
  return schemas.password.safeParse(password).success;
};
