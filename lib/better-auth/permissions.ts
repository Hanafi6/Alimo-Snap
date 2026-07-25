import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const userStatements = [
    ...defaultStatements.user,
    "head",
    "agent",
    "sales",
] as const;

export const statement = {
    ...defaultStatements,

    user: userStatements,
    company: ["create", "update", "delete", "read"],
    assignment: ["assign", "unassign", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
    ...adminAc.statements,
    ...statement,
});

export const head = ac.newRole({
    user: ["sales", "agent"],
});

export const sales = ac.newRole({
    user: ["agent"],
});

export const agent = ac.newRole({});
export type Permissions = {

    [K in keyof typeof ac.statements]?: (typeof ac.statements)[K][number][];
};
