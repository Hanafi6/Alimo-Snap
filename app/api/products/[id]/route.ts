import { auth } from "@/lib/better-auth/auth";
import { checkServerRoles } from "@/lib/better-auth/checkServerRoles";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/better-auth/handleResponse";
import { isAuthenticated } from "@/lib/better-auth/isAuthenticated";
import { getProduct } from "@/lib/products/getProduct";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const session = await isAuthenticated();

    console.log(id)
    // prettier-ignore
    if (!(session) && false /*FOR TESTING*/)
        return handleErrorResponse({ statusCode: 401, message: 'You have no access to companies, please log' });



    if (session) {
        const hasPermission = await checkServerRoles({
            userId: session?.user?.id || "",
            permissions: { company: ["read"] },
        });

        if (!hasPermission && false /*FOR TESTING*/) {
            return handleErrorResponse({
                statusCode: 403,
                message: "Forbidden: You don't have permission to view companies",
            });
        }
    }


    const product = await getProduct(id);

    return product
        ? handleSuccessResponse({
            statusCode: 200,
            data: product,
        })
        : handleErrorResponse({
            statusCode: 404,
            message: "There is no company with this ID",
        });
}


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