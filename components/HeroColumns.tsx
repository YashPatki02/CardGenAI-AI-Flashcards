"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Features from "@/components/Features";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion, animate } from "framer-motion";

const HeroColumns = () => {
    const goToFeatures = () => {
        const features = document.getElementById("features");
        if (features) {
            const y = features.getBoundingClientRect().top + window.scrollY;

            animate(window.scrollY, y, {
                duration: 0.8, 
                ease: [0.42, 0, 0.58, 1], 
                onUpdate: (latest) => window.scrollTo(0, latest),
            });
        }
    };

    const flashcard = {
        front: "Your new favorite study tool...",
        back: "CardGenAI!",
    };

    const variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, 
                ease: "easeIn",
                duration: 0.5,
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <>
            <section className="container flex flex-col lg:flex-row items-center gap-8 pt-20 ml-8 sm:gap-10">
                <motion.div
                    className="flex flex-col items-center lg:items-start gap-8 lg:w-1/2"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    
                >
                    <motion.div variants={childVariants}>
                        <Badge
                            className="px-4 py-1 text-md gap-4"
                            variant="secondary"
                        >
                            Introducing CardGenAI <ArrowRight />
                        </Badge>
                    </motion.div>
                    <motion.h1
                        className="text-3xl font-heading font-semibold max-w-5xl text-center sm:text-5xl sm:leading-tight lg:text-left"
                        variants={childVariants}
                    >
                        Your Personal AI-Study Tool to Prepare Flashcards
                    </motion.h1>
                    <motion.p
                        className="text-center text-lg max-w-lg text-muted-foreground sm:text-xl lg:text-left"
                        variants={childVariants}
                    >
                        Create Flashcards with ease and let the AI do the rest.
                        Study smarter, not harder.
                    </motion.p>
                    <motion.div
                        className="flex flex-row items-center gap-4"
                        variants={childVariants}
                    >
                        <Button
                            onClick={goToFeatures}
                            size="lg"
                            variant="outline"
                        >
                            Learn More
                        </Button>
                        <Button size="lg">
                            <Link href="/login">Get Started</Link>
                        </Button>
                    </motion.div>
                </motion.div>
                <div className="flex items-center justify-center sm:mt-8 mb-4 lg:w-1/2">
                    <motion.div
                        className="z-10"
                        whileHover={{ x: 40, y: -10, rotate: 3, zIndex: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        drag
                        dragConstraints={{
                            top: -5,
                            left: -5,
                            right: 5,
                            bottom: 5,
                        }}
                    >
                        <Card className="relative w-[300px] min-h-[400px] flex flex-col items-center justify-center py-6 px-2 cursor-pointer">
                            <CardContent>
                                <p className="absolute right-0 left-0 top-4 text-center text-sm font-semibold text-primary">
                                    1/3
                                </p>
                                <CardTitle className="text-center text-3xl">
                                    {flashcard.front}
                                </CardTitle>
                                <p className="absolute bottom-6 right-0 left-0 text-center text-sm text-muted-foreground">
                                    Front
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div
                        className=""
                        initial={{ x: -80, y: 10, rotate: -2 }}
                        whileHover={{ x: -70, y: 5, rotate: -6, zIndex: 10 }}
                        drag
                        dragConstraints={{
                            top: -5,
                            left: -5,
                            right: 5,
                            bottom: 5,
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Card className="relative w-[300px] -ml-6 min-h-[400px] flex flex-col items-center justify-center py-6 px-2 cursor-pointer">
                            <CardContent>
                                <p className="absolute right-0 left-0 top-4 text-center text-sm font-semibold text-primary">
                                    1/3
                                </p>
                                <CardTitle className="text-center text-3xl text-primary">
                                    {flashcard.back}
                                </CardTitle>
                                <p className="absolute bottom-6 right-0 left-0 text-center text-sm text-muted-foreground">
                                    Back
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>
            <Features />
        </>
    );
};

export default HeroColumns;
