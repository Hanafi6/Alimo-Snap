import { auth } from "@/lib/better-auth/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/products
export async function GET() {
    const products = await prisma.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return NextResponse.json(products);
}

// POST /api/products
export async function POST(request: Request) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const body = await request.json();

    const { name, description, price, stock, image } = body;

    const product = await prisma.product.create({
        data: {
            name,
            description,
            price,
            stock,
            image,
        },
    });

    return NextResponse.json(product, { status: 201 });
}