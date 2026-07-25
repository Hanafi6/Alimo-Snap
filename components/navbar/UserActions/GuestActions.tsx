import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function GuestActions() {
    return (
        <div className="flex gap-2">
            <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/register">Register</Link>
            </Button>
        </div>
    );
}