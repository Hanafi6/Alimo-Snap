import "server-only";
import { auth } from "@/lib/better-auth/auth";
// import type { CheckRolesType } from "@/lib/better-auth/types";
import type { CheckRolesType } from "@/lib/better-auth/types";

export async function checkServerRoles({
  userId,
  permissions,
}: CheckRolesType) {
  const result = await auth.api.userHasPermission({
    body: {
      userId,
      permissions,
    },
  });

  return result.success;
}
