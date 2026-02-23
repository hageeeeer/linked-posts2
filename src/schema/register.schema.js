import * as z from "zod";
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "min 2 chars")
    .max(10, "max 10 chars")
    .nonempty("this field is required!"),
  email: z.string().email("invalid email").nonempty("this field is required!"),
  password: z
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "invalid password",
    )
    .nonempty("this field is required!"),
  rePassword: z.string().nonempty("this field is required!"),
  dateOfBirth: z.string().nonempty("this field is required!"),
  gender: z.enum(["female", "male"]),
}).refine((val)=>val.password===val.rePassword,{
  message:'repassword dont match',
  path:['rePassword']
})
