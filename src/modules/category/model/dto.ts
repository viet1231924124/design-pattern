import { z } from "zod";
import { ModelStatus } from "../../../share/model/base-model";

export enum CategoryStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DELETED = 'DELETED',
}

export const CategoryCreateSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    image: z.string().optional(),
    description: z.string().optional(),
    parentId: z.string().uuid().nullable().optional()
});

export type CategoryCreateDTO = z.infer<typeof CategoryCreateSchema>;


export const CategoryUpdateSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long').optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    parentId: z.string().uuid().nullable().optional(),
    status: z.nativeEnum(ModelStatus).optional()
});

export type CategoryUpdateDTO = z.infer<typeof CategoryUpdateSchema>;

export const CategoryCondDTOSchema = z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    parentId: z.string().uuid().nullable().optional(),
    status: z.nativeEnum(CategoryStatus).optional()
});

export type CategoryCondDTO = z.infer<typeof CategoryCondDTOSchema>;


