import VerifyFields from "@/features/auth/components/auth-fields/verify-fields";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="my-auto w-full flex flex-col items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyFields />
      </Suspense>
    </div>
  );
}
