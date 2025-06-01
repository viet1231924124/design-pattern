import z from "zod";
import { ModelStatus } from "../../../../share/model/base-model";
import { ErrBrandNameTooShort } from "./error";

export const BrandCreateDTOSchema = z.object({
    name: z.string().min(2,'name must be at least 2 characters'),
    image: z.string().optional(),
    description: z.string().optional(),
    tagLine: z.string().optional(),
    status: z.nativeEnum(ModelStatus),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type BrandCreateDTO = z.infer<typeof BrandCreateDTOSchema>;

export const BrandUpdateDTOSchema = z.object({
    name: z.string().min(2,ErrBrandNameTooShort.message).optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    tagLine: z.string().optional(),
    status: z.nativeEnum(ModelStatus).optional(),
});

export type BrandUpdateDTO = z.infer<typeof BrandUpdateDTOSchema>;

export type BrandCondDTO = {};



