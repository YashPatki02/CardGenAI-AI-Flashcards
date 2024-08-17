import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
    return (
        <section
            id="features"
            className="container flex flex-col items-center gap-6 py-20 sm:gap-7"
        >
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
            <div className="mt-7 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                            <Button className="mt-8 w-full">Get Started</Button>
                        </div>
                        <ul className="p-7 py-10 space-y-2">
                            <li className="flex items-center gap-2">
                                <Check size={24} className="text-primary" />
                                <span className="text-muted-foreground">
                                    Upto 3 Flashcard Decks
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
                                    Upto 20 Flashcards per Deck
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
                            <Button className="mt-8 w-full">Get Started</Button>
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
                            <Button className="mt-8 w-full">Get Started</Button>
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
            </div>
        </section>
    );
};

export default Pricing;
