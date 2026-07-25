import { companyPipeline } from "@/features/companies/utils/company.pipeline";
import { prisma } from "@/lib/prisma";

export async function createCompany(data: { name: string; url?: string }) {
    const company = await prisma.company.create({
        data,
        ...companyPipeline,
    });

    return {
        id: company.id,
        name: company.name,
        url: company.url,
        createdAt: company.createdAt,
        numberOfLeads: company._count?.leads ?? 0,
        salesManager: company.users?.[0]?.user?.name ?? null,
    };
}