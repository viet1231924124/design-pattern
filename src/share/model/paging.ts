import z from "zod";

export const PagingDTOSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    total: z.coerce.number().int().positive().default(0),
});

export type PagingDTO = z.infer<typeof PagingDTOSchema>;

