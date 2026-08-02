import Link from "next/link";
import { ArrowRight, Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg    text-foreground">

            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-40 transition-all duration-700 bg-accent" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-[100%] blur-[90px] pointer-events-none opacity-20 bg-primary/20" />

            <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-16">

                {/* 🚀 HERO HEADER CONTENT */}
                <div className="text-center  max-w-3xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border shadow-sm backdrop-blur-md bg-accent/50 border-border text-foreground">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        <span>Next-Generation Shopping Experience</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.15] text-foreground font-heading">
                        Executive Branding & Premium Setup Operations
                    </h1>

                    <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-muted-foreground">
                        True quality starts from within. Discover our handpicked tech gear and modern ecosystem tailored to elevate your business and workspace.
                    </p>

                    <div className="flex items-center justify-center gap-4 pt-2">
                        <Button
                            size="lg"
                            asChild
                            className="rounded-xl font-semibold gap-2 shadow-lg hover:scale-105 transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            <Link href="/products">
                                Get Started <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            asChild
                            className="rounded-xl font-medium border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:bg-accent"
                        >
                            <Link href="/profile">Explore Platform</Link>
                        </Button>
                    </div>
                </div>

                {/* 🃏 INTERACTIVE STACKED CARDS DECK */}
                <div className="group relative max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 md:h-[360px]">

                    {/* Card 1: Left Card */}
                    <div className="w-full max-w-[320px] md:w-[300px] lg:w-[320px] p-6 rounded-2xl border border-border bg-card shadow-xl backdrop-blur-md 
                transition-all duration-500 ease-out cursor-pointer z-10 
                static translate-x-0 translate-y-0 rotate-0
                md:absolute md:-rotate-6 md:translate-y-2.5 
                md:group-hover:-translate-x-56 lg:md:group-hover:-translate-x-70 md:group-hover:-rotate-12 md:group-hover:scale-105 md:group-hover:z-30">
                        <div className="p-3 rounded-xl w-fit mb-4 bg-accent">
                            <Zap className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-bold text-lg mb-1 text-foreground">Instant Sync</h3>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                            Real-time updates with Prisma ORM backend architecture and Better Auth security layers.
                        </p>
                    </div>

                    {/* Card 2: Center Card */}
                    <div className="w-full max-w-[320px] md:w-[310px] lg:w-[330px] p-6 rounded-2xl border border-border bg-card shadow-2xl backdrop-blur-md 
                transition-all duration-500 ease-out cursor-pointer z-30 
                static translate-x-0 translate-y-0
                md:absolute md:z-30 
                md:group-hover:-translate-y-8 md:group-hover:scale-110 md:group-hover:z-40">
                        <div className="flex justify-between items-center mb-4">
                            <div className="p-3 rounded-xl w-fit bg-accent">
                                <Layers className="w-6 h-6 text-purple-600" />
                            </div>
                            <span className="text-[10px] font-bold px-2 py-1 rounded-md uppercase bg-muted text-foreground">
                                Featured
                            </span>
                        </div>
                        <h3 className="font-bold text-lg mb-1 text-foreground">Seamless Catalog</h3>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                            Browse 30+ items with instant state syncing, responsive grids, and detailed product modals.
                        </p>
                    </div>

                    {/* Card 3: Right Card */}
                    <div className="w-full max-w-[320px] md:w-[300px] lg:w-[320px] p-6 rounded-2xl border border-border bg-card shadow-xl backdrop-blur-md 
                transition-all duration-500 ease-out cursor-pointer z-20 
                static translate-x-0 translate-y-0 rotate-0
                md:absolute md:rotate-6 md:translate-y-2.5 
                md:group-hover:translate-x-56 lg:md:group-hover:translate-x-70 md:group-hover:rotate-12 md:group-hover:scale-105 md:group-hover:z-30">
                        <div className="p-3 rounded-xl w-fit mb-4 bg-accent">
                            <ShieldCheck className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-bold text-lg mb-1 text-foreground">RBAC Security</h3>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                            Role-based routing guard system built for Admins, Sales, and Agents control.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}

