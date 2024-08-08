import prisma from "../../utils/prisma";
import { CreateProductInput } from "./product.schema";

export async function createProduct(data: CreateProductInput & { ownerId: number }) {
    return prisma.products.create({
        data,
    })
}

export async function getProducts() {
    return prisma.products.findMany({
        select: {
            id: true,
            title: true,
            price: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            owner: {
                select: {
                    id: true,
                    name: true,
                }
            },
        }
    });
};