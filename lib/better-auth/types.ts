


import { Permissions } from "@/lib/better-auth/permissions";

export type CheckRolesType = {
  userId: string;
  permissions: Permissions;
};

export type Status = "fail" | "error";
export type ResponseError = {
  status: Status;
  message: string;
  details?: Record<string, unknown>;
};
