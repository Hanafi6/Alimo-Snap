'use client'
import type { Product } from "@/generated/prisma/client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressiveImage } from "../ProgressiveImage";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {

    const rout = useRouter()

    return (
        <Card className="group overflow-hidden rounded  bg-card text-card-foreground transition-all duration-300  flex flex-col justify-between">
            <div>
                <CardHeader className="p-0">
                    <div className="group relative aspect-square w-full overflow-hidden rounded-xl">
                        <ProgressiveImage
                            src={product.image || ""}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 z-20 flex items-center justify-center  backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100">
                            <div className="
                            w-full
                            h-[19%]
                            transform  translate-y-2 group-hover:translate-y-0
                             transition-all duration-300 
                             border-y-2
                              font-medium text-sm px-4 py-2.5 
                               shadow-lg backdrop-blur-md
                                flex items-center gap-2
                                justify-center p-1
                                 ">
                                <span className="
                                bg-accent-foreground
                                hover:text-accent-foreground
                                duration-200
                                rounded cursor-pointer
                                text-accent p-1
                                 hover:bg-card/9"
                                    onClick={_ => rout.push(`/products/${product.id}`)}
                                >
                                    <Eye />
                                </span>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-5">
                    <h3 className="font-heading text-lg font-bold text-custom-text-h line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                </CardContent>
            </div>

            <CardFooter className="flex items-center justify-between border-t border p-5 pt-4">
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Price</span>
                    <span className="text-xl font-bold text-custom-text-h">
                        ${Number(product.price).toFixed(2)}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={() => rout.push(`/products/${product.id}`)}
                        className="md:hidden h-10 w-10 shrink-0 rounded-radius"
                    >
                        <Eye className="w-4 h-4" />
                    </Button>

                    <Button
                        disabled={product.stock === 0}
                        className="rounded-radius bg-primary text-primary-foreground hover:opacity-90 font-medium transition-opacity"
                    >
                        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}