import { auth } from "@/lib/better-auth/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// 1. تعديل (PATCH)
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return NextResponse.json({ error: "غير مصرح لك" }, { status: 401 });


    const { id } = await params;
    const body = await request.json();

    // تحديث في نيون عن طريق بريسما
    const updatedPost = await prisma.post.update({
        where: { id: id },
        data: { title: body.title, content: body.content },
    });

    return NextResponse.json(updatedPost);
}

// 2. حذف (DELETE)
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return NextResponse.json({ error: "غير مصرح لك" }, { status: 401 });

    const { id } = await params

    await prisma.post.delete({
        where: { id: id },
    });

    return NextResponse.json({ message: "تم الحذف بنجاح" });
}
