"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import FlashcardDeck from "@/components/FlashcardDeck";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFlashcardsByUserId, getUserById } from "@/lib/firebaseUtils";
import Link from "next/link";
import {LoaderCircle} from "lucide-react";

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

    const [flashcards, setFlashcards] = useState<FlashcardDeckProps[]>([]);
    const [flashcardLoading, setFlashcardLoading] = useState(false);

    const [userData, setUserData] = useState<any | null>(null);

    useEffect(() => {
        const getData = async () => {
            setFlashcardLoading(true);

            try {
                const data = await getFlashcardsByUserId(currentUser?.uid);
                if (data) {
                    setFlashcards(data);
                } else {
                    console.log("No flashcards found");
                    setFlashcards([]);
                }
            } catch (error) {
                console.error("Error loading flashcards:");
            } finally {
                setFlashcardLoading(false);
            }
        };

        if (!isLoading) {
            if (currentUser) {
                getData();
            } else {
                console.log("no current users");
                return redirect("/login");
            }
        }
    }, [currentUser, isLoading]);

    useEffect(() => {
        const getUserData = async () => {
            if (currentUser) {
                try {
                    const data = await getUserById(currentUser?.uid);
                    if (data) {
                        console.log(data)
                        setUserData(data);
                    } else {
                        console.log("No user data found");
                        setUserData(null);
                    }
                } catch (error) {
                    console.error("Error loading user data:");
                }
            }
        };

        if (currentUser) {
            getUserData();
        }
    }, [currentUser]);

    if (isLoading || flashcardLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoaderCircle
                    className="text-primary animate-spin mb-20"
                    size={48}
                />
            </div>
        );
    }

    return (
        <section className="container flex flex-col items-start gap-8 pt-8 px-8 md:px-20 sm:gap-10 min-h-screen">
            <div className="flex flex-row items-center justify-between w-full">
                <h1 className="text-xl font-semibold md:text-2xl">My Decks</h1>
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
                            creator={userData?.firstName + " " + userData?.lastName}
                            createdAt={flashcard?.created_at}
                            docID={flashcard?.id}
                        />
                    ))}
                </div>
            ) : (
                <div className="w-full flex items-start justify-center font-semibold text-2xl h-screen mt-20">
                    No Flashcard Decks Found, Create One Now!
                </div>
            )}
        </section>
    );
};

export default Flashcards;
