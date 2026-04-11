import { PassThrough } from "node:stream";
import {z} from "zod";

export const SignupSchema = z.object({
        email : z.string().email({message : "Invalid email address"}),
        password : z.string().min(6, {message : "Password must be at least 6 characters long"}),
})

export const loginSchema = z.object({
    email : z.string().email("invalid email"),
    password : z.string().min(1, "password is required")
})