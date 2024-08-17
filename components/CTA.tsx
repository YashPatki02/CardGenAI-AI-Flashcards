import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const CTA = () => {
    return (
        <section className="container flex flex-col mb-10 items-center gap-6 sm:gap-10 relative py-20">
            <h2 className="text-3xl font-heading font-semibold text-center sm:text-4xl max-w-xl">
                Ready to get started?
            </h2>
            <p className="text-center text-lg max-w-xl text-muted-foreground">
                Sign up today and start your fitness journey for free! Chat with
                our AI coaches and get personalized workout plans and nutrition
                advice.
            </p>
            <Button size="lg" className="py-4 px-8 text-base border-border">
                <Link href="/login">Get Started</Link>
            </Button>
        </section>
    );
};

export default CTA;
