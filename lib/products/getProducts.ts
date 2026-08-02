import { prisma } from "../prisma";

export async function getPrroducts() {
    const Product = await prisma.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return Product
}