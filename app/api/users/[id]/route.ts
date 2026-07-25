import { auth } from "@/lib/better-auth/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/users/:id
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            posts: true,
        },
    });

    if (!user) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(user);
}

// PATCH /api/users/:id
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const { id } = await params;

    if (session.user.id !== id) {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );
    }

    const body = await request.json();

    const user = await prisma.user.update({
        where: {
            id,
        },
        data: {
            name: body.name,
            image: body.image,
        },
    });

    return NextResponse.json(user);
}