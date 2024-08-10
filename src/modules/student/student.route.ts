import { FastifyInstance } from "fastify";
import { createStudentHandler, getStudentsHandler } from "./student.controller";
import { $ref } from "./student.schema";

async function studentRoutes(server: FastifyInstance) {
    server.post('/create', {
        preHandler: [server.authenticate],
        schema: {
            body: $ref('createStudentSchema'),
            response: {
                201: $ref('studentResponseSchema')
            }
        }
    }, createStudentHandler);

    server.get('/liststudents', {
        schema: {
            response: {
                200: $ref('studentsResponseSchema')
            }
        }
    }, getStudentsHandler)
};

export default studentRoutes;