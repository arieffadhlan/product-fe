import * as v from "valibot";

export const LoginSchema = v.object({
  username: v.pipe(v.string("required"), v.minLength(1, "Username must be at least 1 characters.")),
  password: v.pipe(v.string("required"), v.minLength(8, "Password must be at least 8 characters.")),
});

export type LoginSchemaType = v.InferInput<typeof LoginSchema>;
