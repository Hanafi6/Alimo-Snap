// import { companyPipeline } from "@/features/companies/utils/company.pipeline";
import { prisma } from "@/lib/prisma";


export async function getProduct(id: string) {
    const products = await prisma.product.findUnique({
        where: {
            id,
        },
        // omit: {

        //     userId: true,

        //     updatedAt: true,

        // },



        // include: {



        //     // users: {

        //     //     where: {

        //     //         user: {

        //     //             role: "sales",

        //     //         },

        //     //     },

        //     //     select: {

        //     //         user: {

        //     //             select: {

        //     //                 name: true,

        //     //             },

        //     //         },

        //     //     },

        //     // },



        //     _count: {

        //         select: {

        //             leads: true,

        //         },

        //     },

        // },

        //   ...companyPipeline,
    });
    return (
        products
    );
}