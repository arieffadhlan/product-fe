import * as v from "valibot";

export const ProductSchema = v.object({
  title: v.pipe(v.string("Required"), v.minLength(1, "Required")),
});

export type ProductSchemaType = v.InferInput<typeof ProductSchema>;
