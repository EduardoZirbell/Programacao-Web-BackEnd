import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fjwt from '@fastify/jwt';
import userRoutes from "./modules/user/user.route";
import { userSchemas } from './modules/user/user.schema'

export const server = Fastify();

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



for (const schema of userSchemas) {
    server.addSchema(schema);
}

server.register(userRoutes, { prefix: 'api/users' })

server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`)
});

