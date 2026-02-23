import * as z from "zod";
export const loginSchema = z.object({
 
  email: z.string().email("invalid email").nonempty("this field is required!"),
  password: z
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "invalid password",
    )
    .nonempty("this field is required!"),
 
})