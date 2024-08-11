import prisma from "../../utils/prisma";
import { CreateStudentInput } from "./student.schema";

export async function createStudent(data: CreateStudentInput) {
    if (data.name == '') {
        throw ('Name is required.');
    } if (data.phone == '') {
        throw ('Phone is required.');
    } else {
        return prisma.students.create({
            data
        })
    }
}

export async function getStudents() {
    return prisma.students.findMany({
        select: {
            id: true,
            name: true,
            phone: true,
            createdAt: true,
            updatedAt: true,
        }
    });
};