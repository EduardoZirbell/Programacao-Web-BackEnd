import { FastifyInstance } from "fastify";
import { createStudentHandler, getStudentsHandler } from "./student.controller";
import { $ref } from "./student.schema";

async function studentRoutes(server: FastifyInstance) {
    server.post('/createStudent', {
        preHandler: [server.authenticate],
        schema: {
            body: $ref('createStudentSchema'),
            response: {
                200: $ref('studentResponseSchema')
            }
        }
    }, createStudentHandler);

    server.get('/listStudents', {
        schema: {
            response: {
                200: $ref('studentsResponseSchema')
            }
        }
    }, getStudentsHandler)
};

export default studentRoutes;