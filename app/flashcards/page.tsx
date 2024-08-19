"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import FlashcardDeck from "@/components/FlashcardDeck";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFlashcardsByUserId } from "@/lib/firebaseUtils";
import Link from "next/link";

interface FlashcardDeckProps {
    id: string;
    title: string;
    numberCards: number;
    description: string;
    questions: {
        front: string;
        back: string;
    }[];
    creator: string;
    created_at: string;
    docID: string;
}

const Flashcards = () => {
    const { isLoading, currentUser } = useAuth();
    const router = useRouter();

    //   !
    const [flashcards, setFlashcards] = useState<FlashcardDeckProps[]>([]);
    useEffect(() => {
        const getData = async () => {
            // const id = "eKlEoznoXBbABrBN4tjIf7ycECu1"; // Replace with dynamic ID if necessary
            const id = currentUser.uid;
            //   const id = currentUser.uid;
            try {
                const data = await getFlashcardsByUserId(id);
                console.log("Flashcards:", data);
                setFlashcards(data);
                // Handle flashcards data
            } catch (error) {
                console.error("Error loading flashcards:");
            }
        };
        if (isLoading && !currentUser) {
            //
            console.log("no current users");
            //
            return redirect("/login");
        }
        getData();
    }, []);

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

            {flashcards.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-start w-full gap-8 mt-2 mb-12">
                    {flashcards.map((flashcard) => (
                        <FlashcardDeck
                            key={flashcard?.id}
                            title={flashcard?.title}
                            description={flashcard?.description}
                            numberCards={flashcard?.questions.length}
                            creator="John Doe" //! Replace or remove as needed
                            createdAt={flashcard?.created_at}
                            docID={flashcard?.id}
                        />
                    ))}
                </div>
            ) : (
                <div>
                    Create new flashcard by clicking create flashcard button
                </div>
            )}
        </section>
    );
};

export default Flashcards;
