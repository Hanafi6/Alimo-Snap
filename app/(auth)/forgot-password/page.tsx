import ForgetPassword from "@/features/auth/components/auth-fields/forget-password"
import VerifyFields from "@/features/auth/components/auth-fields/verify-fields"
import { getSessionServer } from "@/lib/session";

async function page() {

    const session = await getSessionServer();
    return <ForgetPassword />
}

export default page