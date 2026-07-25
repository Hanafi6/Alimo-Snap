import { auth } from "@/lib/better-auth/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PATCH /api/products/:id
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const { id } = await params;

    const body = await request.json();

    const product = await prisma.product.update({
        where: {
            id,
        },
        data: body,
    });

    return NextResponse.json(product);
}

// DELETE /api/products/:id
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const { id } = await params;

    await prisma.product.delete({
        where: {
            id,
        },
    });

    return NextResponse.json({
        message: "Product deleted successfully",
    });
}