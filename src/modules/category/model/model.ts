import { z } from "zod";
import { ModelStatus } from "../../../share/model/base-model";

enum CategoryStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DELETED = 'DELETED',
}

const CategoryCreateSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    image: z.string(),
    description: z.string(),
    parentId: z.string().uuid().nullable().optional()
});

type CategoryCreate = z.infer<typeof CategoryCreateSchema>;

const CategoryUpdateSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long').optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    parentId: z.string().uuid().nullable().optional(),
    status: z.nativeEnum(ModelStatus).optional()
});

type CategoryUpdate = z.infer<typeof CategoryUpdateSchema>;

const CategorySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3,'Name must be at least 3 characters long'),
    image: z.string().optional(),
    description: z.string().optional(),
    position: z.number().min(0,'Position must be greater than 0').default(0),
    parentId: z.string().uuid().nullable().optional(),
    status: z.nativeEnum(ModelStatus),
    createdAt: z.date(),
    updatedAt: z.date(),
});

type Category = z.infer<typeof CategorySchema> & {children?: Category[];};

export {CategoryCreateSchema,CategoryUpdateSchema,CategorySchema,CategoryCreate,CategoryUpdate,Category,CategoryStatus};