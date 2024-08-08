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

async function main() {

    for (const schema of userSchemas) {
        server.addSchema(schema);
    }

    server.register(userRoutes, { prefix: 'api/users' })

    try {
        await server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
            console.log(`Server listening at ${address}`)
        })
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main();