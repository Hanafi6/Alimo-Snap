import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


type TapsProps = {
    links: { title: string, href: string }[];
    isPending: boolean;
    className?: string
};
function Taps({ links, isPending, className }: TapsProps) {
    const pathname = usePathname();

    if (isPending) {
        return (
            <div className={cn("hidden md:flex items-center  w-full gap-6", className)}>
                {links.map((link) => (
                    <div
                        key={link.href}
                        className="h-4 w-20 rounded-md bg-muted animate-pulse"
                    />
                ))}
            </div>
        );
    }

    return (
        <>
            {
                links.map((link) => {
                    let isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}

                            className={`${isActive && 'text-background underline font-semibold'}
                        text-sm font-medium text-card-foreground border-primary hover:border-2 duration-600 rounded-md px-3 py-1
                        transition-colors`}
                        >
                            {link.title}
                        </Link>
                    )

                })
            }
        </>

    )
}

export default Taps