import { companyPipeline } from "@/features/companies/utils/company.pipeline";
import { prisma } from "@/lib/prisma";

export async function updateCompany(
    id: string,
    data: Partial<{ name: string; url: string }>
) {
    const company = await prisma.company.update({
        where: { id },
        data,
        ...companyPipeline,
    });

    return (
        company && {
            id: company.id,
            name: company.name,
            url: company.url,
            createdAt: company.createdAt,
            numberOfLeads: company._count?.leads ?? 0,
            salesManager: company.users?.[0]?.user?.name ?? null,
        }
    );
}