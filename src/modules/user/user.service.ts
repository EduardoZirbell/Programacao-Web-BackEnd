import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {

    const { password, ...rest } = input;
    const email = input.email;

    const { hash, salt } = hashPassword(password);

    const user = await prisma.users.findFirst({ where: { email } });
    if (user) {
        throw ("O email já está sendo usado.");
    }
    const newUser = await prisma.users.create({
        data: { ...rest, salt, password: hash },
    });

    return newUser;
};

export async function findUserByEmail(email: string) {
    return prisma.users.findUnique({
        where: { email, }
    })
}