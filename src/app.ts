import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fjwt from '@fastify/jwt';
import swagger from '@fastify/swagger';
import { withRefResolver } from "fastify-zod";
import userRoutes from "./modules/user/user.route";
import studentRoutes from "./modules/student/student.route";
import { userSchemas } from './modules/user/user.schema';
import { studentSchemas } from './modules/student/student.schema';
import { version } from '../package.json'
import cors from "@fastify/cors";

export const server = Fastify();

server.register(cors, {
    origin: '*',
});

declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: any;
    }
}

declare module '@fastify/jwt' {
    export interface FastifyJWT {
        user: {
            "id": number;
            "email": string;
            "name": string;
        }
    }
}

server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
    } catch (e) {
        return reply.send(e);
    }
});

server.register(fjwt, {
    secret: 'teste',
});

for (const schema of [...userSchemas, ...studentSchemas]) {
    server.addSchema(schema);
};

server.register(
    swagger,
    withRefResolver({
        openapi: {
            info: {
                title: 'Prova de Suficiência - Programação WEB',
                description: 'APIs for the test.',
                version: version,
            }
        }
    })
)

server.register(userRoutes, { prefix: 'api/users' })
server.register(studentRoutes, { prefix: 'api/students' })

server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`)
});

