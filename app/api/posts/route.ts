import { auth } from "@/lib/better-auth/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const posts = await prisma.post.findMany();

    return NextResponse.json(posts);
}

// 2. إنشاء بيان جديد (POST) - مأمن بـ Better Auth
export async function POST(request: Request) {
    // هنا بنجيب الـ session عشان نشوف مين اللي باعت الريكويست
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
        return NextResponse.json({ error: "مش مسموح لك، سجل دخول الأول" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content } = body;

    const newPost = await prisma.post.create({
        data: {
            title,
            content,
            userId: session.user.id,
        },
    });

    return NextResponse.json(newPost, { status: 201 });
}
