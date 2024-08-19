"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ManualFlashcards from "./ManualFlashcards";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { addFlashcard } from "@/lib/firebaseUtils";

const ManualEntry = () => {
    const { currentUser } = useAuth();
    const router = useRouter();
    const [cards, setCards] = useState<{ front: string; back: string }[]>([
        { front: "", back: "" },
    ]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const getFormattedDate = () => {
        const today = new Date();
        return today
            .toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
            })
            .replace(/\//g, "-");
    };

    const handleSubmit = async () => {
        if (
            cards.length === 1 &&
            cards[0].front === "" &&
            cards[0].back === ""
        ) {
            setError("Please fill out at least one flashcard.");
            return;
        }

        if (!title.trim()) {
            setError("Please enter a title for the flashcard deck.");
            return;
        }
        //! add to the database
        const flashcard_obj = {
            title: title,
            description: description,
            private: true,
            questions: cards,
            created_at: getFormattedDate(),
        };
        console.log(flashcard_obj);
        try {
            const userId = currentUser.uid;
            const docId = await addFlashcard(userId, flashcard_obj);

            router.push(`/flashcards/${docId}`);
        } catch (error) {
            console.error("Error saving flashcard:", error);
        }
    };

    return (
        <Card className="w-full mb-20">
            <CardHeader>
                <CardTitle>Manual Entry</CardTitle>
                <CardDescription>
                    Enter the front and back of the flashcards
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-4">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </form>
                <ManualFlashcards
                    cards={cards}
                    setCards={setCards}
                    allowAdd={cards.length < 15}
                />
                <Separator className="my-4" />
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <Button onClick={handleSubmit} className="w-full">
                    Generate Flashcard Deck
                </Button>
            </CardContent>
        </Card>
    );
};

export default ManualEntry;