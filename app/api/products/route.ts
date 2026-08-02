import { auth } from "@/lib/better-auth/auth";
import { checkServerRoles } from "@/lib/better-auth/checkServerRoles";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/better-auth/handleResponse";
import { isAuthenticated } from "@/lib/better-auth/isAuthenticated";
import { prisma } from "@/lib/prisma";
import { getPrroducts } from "@/lib/products/getProducts";
import { NextResponse } from "next/server";

// GET /api/products
export async function GET() {
    const session = await isAuthenticated()

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

    const product = await getPrroducts()

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