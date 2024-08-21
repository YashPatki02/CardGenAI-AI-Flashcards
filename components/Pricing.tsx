import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import getStripe from "@/utils/get-stripe";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getUserById } from "@/lib/firebaseUtils";

const Pricing = ({ hidden = false }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const router = useRouter();
    const { currentUser } = useAuth();
    const [userSubscription, setUserSubscription] = useState<string | null>(
        null
    );

    useEffect(() => {
        const getUserData = async () => {
            const userData: any = await getUserById(currentUser.uid);
            setUserSubscription(userData.subscription);
        };

        if (currentUser) {
            try {
                getUserData();
            } catch (error) {
                console.log(error);
            }
        }
    }, [currentUser]);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                ease: "easeIn",
                duration: 0.5,
            },
            delay: 0.2,
        },
    };

    const handleSubmit = async (priceId: string): Promise<void> => {
        const checkoutSession = await fetch("/api/checkout_sessions", {
            method: "POST",
            headers: { origin: "http://localhost:3000/" },
            body: JSON.stringify({ priceId }),
        });
        const checkoutSessionJson = await checkoutSession.json();

        const stripe = await getStripe();
        const { error } = await stripe!.redirectToCheckout({
            // This is type asssertion (!) -- not safe gotta change it
            sessionId: checkoutSessionJson.id,
        });

        if (error) {
            console.warn(error.message);
        }
    };

    return (
        <motion.section
            ref={ref}
            className="container flex flex-col items-center gap-6 py-20 sm:gap-7"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.3,
                    },
                },
            }}
        >
            {!hidden && (
                <>
                    <div className="flex flex-col gap-3">
                        <span className="font-bold uppercase text-primary text-center">
                            Pricing
                        </span>
                        <h2 className="text-3xl font-heading font-semibold text-center sm:text-4xl">
                            Simplified Pricing Plans
                        </h2>
                    </div>
                    <p className="text-center text-lg max-w-2xl text-muted-foreground">
                        Choose the plan that best fits your needs.
                    </p>
                </>
            )}
            {hidden && (
                <h2 className="text-2xl font-heading font-semibold text-center sm:text-3xl">
                    Choose a Plan
                </h2>
            )}
            <div className="mt-7 grid w-full grid-cols-1 gap-6 md:grid-cols-2 px-2 sm:px-6 md:px-10 lg:px-32">
                <motion.div variants={cardVariants}>
                    <Card className="relative shadow-lg">
                        <CardContent className="divide-y p-0">
                            <div className="flex flex-col items-center px-7 py-10">
                                <h4 className="text-2xl font-semibold text-primary font-heading">
                                    Free
                                </h4>
                                <p className="mt-2 text-muted-foreground">
                                    For hobbyists and beginners
                                </p>
                                <div className="mt-4">
                                    <span className="text-5xl font-heading font-semibold">
                                        $0
                                    </span>
                                    <span className="text-sm">/month</span>
                                </div>
                                <Button
                                    className="mt-8 w-full"
                                    onClick={() => {
                                        if (currentUser) {
                                            router.push("/flashcards");
                                        } else {
                                            router.push("/login");
                                        }
                                    }}
                                >
                                    {currentUser
                                        ? "Go to Decks"
                                        : "Get Started"}
                                </Button>
                            </div>
                            <ul className="p-7 py-10 space-y-2">
                                <li className="flex items-center gap-2">
                                    <Check size={24} className="text-primary" />
                                    <span className="text-muted-foreground">
                                        Up to 3 Flashcard Decks
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={24} className="text-primary" />
                                    <span className="text-muted-foreground">
                                        AI Flashcard Generation
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={24} className="text-primary" />
                                    <span className="text-muted-foreground">
                                        Up to 20 Flashcards per Deck
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={24} className="text-primary" />
                                    <span className="text-muted-foreground">
                                        Favorite Flashcards
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={24} className="text-primary" />
                                    <span className="text-muted-foreground">
                                        Basic Support
                                    </span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={cardVariants}>
                    <Card className="relative shadow-lg">
                        <CardContent className="divide-y p-0">
                            <div className="flex flex-col items-center px-7 py-10">
                                <span
                                    className={`absolute inset-x-0 -top-5 mx-auto w-32 rounded-full
                                    bg-primary px-3 py-2 text-center text-sm font-semibold
                                    text-primary-foreground shadow-md`}
                                >
                                    Most Popular
                                </span>
                                <h4 className="text-2xl font-semibold text-primary font-heading">
                                    Pro
                                </h4>
                                <p className="mt-2 text-muted-foreground">
                                    For professionals and teams
                                </p>
                                <div className="mt-4">
                                    <span className="text-5xl font-heading font-semibold">
                                        $9
                                    </span>
                                    <span className="text-sm">/month</span>
                                </div>
                                <Button
                                    onClick={() => {
                                        if (!currentUser) {
                                            router.push("/login");
                                        } else {
                                            if (userSubscription === "Free") {
                                                handleSubmit(
                                                    "price_1PpGTSFJSAPpXIUXTZctLMqF"
                                                );
                                            } else {
                                                router.push("/flashcards");
                                            }
                                        }
                                    }}
                                    className="mt-8 w-full"
                                >
                                    {!currentUser
                                        ? "Get Started"
                                        : userSubscription === "Free"
                                        ? "Upgrade Plan"
                                        : "Your Current Plan - Go to Decks"}
                                </Button>
                            </div>
                            <ul className="p-7 py-10 space-y-2">
                                <li className="flex items-center gap-2">
                                    <Check size={24} className="text-primary" />
                                    <span className="text-muted-foreground">
                                        Unlimited Flashcard Decks
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={24} className="text-primary" />
                                    <span className="text-muted-foreground">
                                        AI Flashcard Generation
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={24} className="text-primary" />
                                    <span className="text-muted-foreground">
                                        Unlimited Flashcards per Deck
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={24} className="text-primary" />
                                    <span className="text-muted-foreground">
                                        Favorite Flashcards
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={24} className="text-primary" />
                                    <span className="text-muted-foreground">
                                        Priority Support
                                    </span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </motion.div>
                {/* <motion.div variants={cardVariants}>
                    <Card className="relative shadow-lg">
                        <CardContent className="divide-y p-0">
                            <div className="flex flex-col items-center px-7 py-10">
                                <h4 className="text-2xl font-semibold text-primary font-heading">
                                    Enterprise
                                </h4>
                                <p className="mt-2 text-muted-foreground">
                                    For large organizations
                                </p>
                                <div className="mt-4">
                                    <span className="text-5xl font-heading font-semibold">
                                        $29
                                    </span>
                                    <span className="text-sm">/month</span>
                                </div>
                                <Button
                                    onClick={() =>
                                        handleSubmit(
                                            "price_1PpGVeFJSAPpXIUXGZwI82OE"
                                        )
                                    }
                                    className="mt-8 w-full"
                                >
                                    Get Started
                                </Button>
                            </div>
                            <ul className="p-7 py-10 space-y-2">
                                <li className="flex items-center gap-2">
                                    <Check size={24} className="text-primary" />
                                    <span className="text-muted-foreground">
                                        Unlimited Flashcard Decks
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={24} className="text-primary" />
                                    <span className="text-muted-foreground">
                                        AI Flashcard Generation
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={24} className="text-primary" />
                                    <span className="text-muted-foreground">
                                        Unlimited Flashcards per Deck
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={24} className="text-primary" />
                                    <span className="text-muted-foreground">
                                        Favorite Flashcards
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={24} className="text-primary" />
                                    <span className="text-muted-foreground">
                                        Premium Support
                                    </span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </motion.div> */}
            </div>
        </motion.section>
    );
};

export default Pricing;
