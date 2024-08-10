import { FastifyReply, FastifyRequest } from "fastify";
import { createStudent, getStudents } from "./student.service";
import { CreateStudentInput } from "./student.schema";

export async function createStudentHandler(request: FastifyRequest<{
    Body: CreateStudentInput
}>) {
    const body = request.body;
    const student = await createStudent(body);
    return student;
}

export async function getStudentsHandler() {
    const students = await getStudents();

    return students;
}