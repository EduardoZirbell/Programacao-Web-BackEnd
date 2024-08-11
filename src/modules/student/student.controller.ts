import { FastifyReply, FastifyRequest } from "fastify";
import { createStudent, getStudents } from "./student.service";
import { CreateStudentInput } from "./student.schema";

export async function createStudentHandler(
    request: FastifyRequest<{
        Body: CreateStudentInput
    }>,
    reply: FastifyReply) {

    const body = request.body;

    try {
        const student = await createStudent(body);
        return reply.code(200).send(student);
    } catch (e) {
        return reply.code(400).send(
            { message: e }
        );
    }

}

export async function getStudentsHandler() {
    const students = await getStudents();
    return students;
}