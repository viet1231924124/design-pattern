import { z } from "zod";
import { ModelStatus } from "../../../../share/model/base-model";
import { ErrBrandNameTooShort } from "./error";

export const ModelName = 'brand';


export const BrandSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2,ErrBrandNameTooShort.message),
    image: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    tagLine: z.string().optional(),
    status: z.nativeEnum(ModelStatus),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type Brand = z.infer<typeof BrandSchema>;




