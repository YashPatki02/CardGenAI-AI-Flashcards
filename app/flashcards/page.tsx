"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import FlashcardDeck from "@/components/FlashcardDeck";
import Link from "next/link";

const Flashcards = () => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        redirect("/login");
    }

    return (
        <section className="container flex flex-col items-start gap-8 pt-8 px-8 md:px-20 sm:gap-10 min-h-screen">
            <div className="flex flex-row items-center justify-between w-full">
                <h1 className="text-2xl font-bold md:text-3xl">My Decks</h1>
                <Link href="/create">
                    <Button className="text-md font-semibold" size="default">
                        Create Deck
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-start w-full gap-8 mt-2 mb-12">
                <FlashcardDeck
                    title="Deck 1"
                    description="This is a description for Deck 1"
                    numberCards={10}
                    creator="John Doe"
                    createdAt="2024-08-16"
                />
                <FlashcardDeck
                    title="Deck 2"
                    description="This is a description for Deck 2"
                    numberCards={20}
                    creator="Jane Smith"
                    createdAt="2024-08-15"
                />
            </div>
        </section>
    );
};

export default Flashcards;
