import { z } from 'zod'
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
}

const createUserSchema = z.object({
    ...userCore,
    id: z.number(),
    password: z.string({
        required_error: 'É necessário informar a senha.',
        invalid_type_error: 'Senha deve ser uma string.'
    }),
});

const createUserResponseSchema = z.object({
    ...userCore,
})

export type CreateUserInput = z.infer<typeof createUserSchema>