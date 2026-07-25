
import { prisma } from "@/lib/prisma"; // أو المسار الصحيح عندك

async function resetUsers() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("🚫 Refusing to run destructive script on production!");
  }

  console.log("🧹 Starting cleanup...");

  const sessions = await prisma.session.deleteMany({});
  console.log(`✅ Deleted ${sessions.count} sessions`);

  const accounts = await prisma.account.deleteMany({});
  console.log(`✅ Deleted ${accounts.count} accounts (OAuth links)`);

  const verifications = await prisma.verification.deleteMany({});
  console.log(`✅ Deleted ${verifications.count} verification tokens`);

  const users = await prisma.user.deleteMany({});
  console.log(`✅ Deleted ${users.count} users`);

  console.log("🎉 Database fully reset.");
}

resetUsers()
  .catch((e) => {
    console.error("❌ Error during reset:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });