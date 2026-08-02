"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { ParamValue } from "next/dist/server/request/params";
// import { ProgressiveImage } from "../ProgressiveImage";


import Image from "next/image"
import BackToHomBtn from "@/components/back-to-home-btn";

interface SingleProductCardProps {
    id: ParamValue;
}


export default function SingleProductCage({ id }: SingleProductCardProps) {
    const { product, error, isLoading } = useProducts(id);
    const [quantity, setQuantity] = useState(1);

    if (isLoading) {
        return (
            <div className="w-full max-w-6xl mx-auto py-12 px-4">
                <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
                    <div className="w-full md:w-1/2 space-y-6">
                        <Skeleton className="h-10 w-3/4 bg-muted/20" />
                        <Skeleton className="h-8 w-1/4 bg-muted/20" />
                        <Skeleton className="h-20 w-full bg-muted/20" />
                        <Skeleton className="h-10 w-32 bg-muted/20" />
                        <Skeleton className="h-12 w-full bg-muted/20" />
                    </div>
                    <div className="w-full md:w-5/12 h-[450px]">
                        <Skeleton className="w-full h-full rounded-2xl bg-muted/20" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="w-full py-16 text-center text-muted-foreground">
                {error || "Product not found"}
            </div>
        );
    }

    return (
        <section className="w-full max-w-6xl mx-auto py-8 px-4 text-foreground">
            <BackToHomBtn />
            <div className="flex flex-col-reverse md:grid md:grid-cols-12 gap-8 lg:gap-12 items-center">

                <div className="w-full md:col-span-7 flex flex-col justify-center space-y-6">

                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
                            {product.name}
                        </h1>
                        <p className="text-2xl font-bold text-primary">
                            ${product.price ? product.price.toFixed(2) : "0.00"}
                        </p>
                    </div>

                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed border-b border-border/40 pb-6">
                        {product.description}
                    </p>

                    <div className="space-y-3 pt-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Quantity
                        </label>
                        <div className="flex items-center space-x-3">
                            <div className="inline-flex items-center border border-border/60 rounded-lg bg-background/50 p-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-md hover:bg-muted/50"
                                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-3.5 w-3.5" />
                                </Button>

                                <span className="w-10 text-center font-semibold text-sm">
                                    {quantity}
                                </span>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-md hover:bg-muted/50"
                                    onClick={() => setQuantity((prev) => prev + 1)}
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button
                            size="lg"
                            className="w-full md:w-auto px-8 h-12 text-base font-medium transition-all duration-200 gap-2 shadow-lg hover:shadow-primary/20"
                            onClick={() => {
                                console.log("Added to cart:", {
                                    productId: product.id,
                                    quantity,
                                });
                            }}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span>Add to Cart</span>
                        </Button>
                    </div>

                </div>

                <div className="w-full md:col-span-5 flex justify-center items-center">
                    <div className="relative w-full aspect-[3/4] max-h-[500px] overflow-hidden rounded-2xl border border-border/20 bg-muted/10 backdrop-blur-sm">
                        {product.image ? (
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover hover:scale-105 transition-transform duration-500 ease-out"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                                No Image Available
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}