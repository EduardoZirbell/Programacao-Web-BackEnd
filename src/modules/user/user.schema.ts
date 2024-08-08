import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userCore = {
    email: z.string({
        required_error: 'É necessário informar o email.',
        invalid_type_error: 'Email deve ser uma string.'
    }).email(),
    name: z.string({
        required_error: 'É necessário informar o nome.',
        invalid_type_error: 'Nome deve ser uma string.'
    }),
};

const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: 'É necessário informar a senha.',
        invalid_type_error: 'Senha deve ser uma string.'
    }),
});

const createUserResponseSchema = z.object({
    id: z.number(),
    ...userCore,
});

const loginSchema = z.object({
    email: z.string({
        required_error: 'É necessário informar o email.',
        invalid_type_error: 'Email deve ser uma string.'
    }).email(),
    password: z.string({
        required_error: 'É necessário informar a senha.',
        invalid_type_error: 'Senha deve ser uma string.'
    }),
});

const loginResponseSchema = z.object({
    acessToken: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
});