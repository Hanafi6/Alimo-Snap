import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/users
export async function GET() {
    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            posts: true,
        },
    });

    return NextResponse.json(users);
}