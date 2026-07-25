import { companyPipeline } from "@/features/companies/utils/company.pipeline";
import { prisma } from "@/lib/prisma";

export async function getAllCompanies() {
  const companies = (
    await prisma.company.findMany({
      ...companyPipeline,
    })
  ).map(({ users, _count, ...company }) => ({
    ...company,
    numberOfLeads: _count.leads,
    salesManager: users[0]?.user.name ?? null,
  }));

  return companies;
}
