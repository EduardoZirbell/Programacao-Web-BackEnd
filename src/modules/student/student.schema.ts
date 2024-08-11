import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const studentInput = {
    name: z.string({
        required_error: "Name it's necessary",
        invalid_type_error: 'Name must be a string.'
    }),
    phone: z.string({
        required_error: "Phone it's necessary.",
        invalid_type_error: 'Phone must be a string.'
    }),
};

const studentGenerated = {
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
};

const createStudentSchema = z.object({
    ...studentInput,
});

const studentResponseSchema = z.object({
    ...studentInput,
    ...studentGenerated,
});

const studentsResponseSchema = z.array(studentResponseSchema);

export type CreateStudentInput = z.infer<typeof createStudentSchema>;

export const { schemas: studentSchemas, $ref } = buildJsonSchemas({
    createStudentSchema,
    studentResponseSchema,
    studentsResponseSchema,
}, { $id: 'studentsResponseSchema' });

