import { companyPipeline } from "@/features/companies/utils/company.pipeline";
import { prisma } from "@/lib/prisma";

export async function getCompany(id: string) {
  const company = await prisma.company.findUnique({
    where: {
      id,
    },
    ...companyPipeline,
  });
  return (
    company && {
      id: company.id,
      name: company.name,
      url: company.url,
      createdAt: company.createdAt,
      numberOfLeads: company._count.leads,
      salesManager: company.users[0]?.user?.name ?? null,
    }
  );
}
