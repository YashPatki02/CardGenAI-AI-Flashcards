"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { db } from "@/firebase";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { addFlashcard } from "@/lib/firebaseUtils";
import { useAuth } from "@/context/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import ManualFlashcards from "./ManualFlashcards";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

export default function Generate() {
    interface Flashcard {
        front: string;
        back: string;
    }

    const { currentUser } = useAuth();
    const router = useRouter();
    const [flashcard, setFlashcard] = useState<Flashcard[]>([]);
    const [prompt, setPrompt] = useState<string>("");
    const [number, setNumber] = useState<number>(1);
    const [privateDeck, setPrivateDeck] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const maxLength = 4000;

    const handleChange = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async () => {
        if (!prompt.trim()) {
            setError("Please enter some text to generate flashcards.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                body: JSON.stringify({ prompt, number }),
            });
            setPrompt("");

            const data = await response.json();
            setFlashcard(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

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

    const saveFlashcard = async () => {
        if (!title.trim()) {
            setError("Please enter a title for the flashcard deck.");
            return;
        }
        //! add to the database
        const flashcard_obj = {
            title: title,
            description: description,
            private: privateDeck,
            questions: flashcard,
            created_at: getFormattedDate(),
        };
        console.log(flashcard_obj);
        try {
            const userId = currentUser.uid;
            const docId = await addFlashcard(userId, flashcard_obj);
            console.log(docId);
            console.log("Flashcard added successfully");
            router.push(`/flashcards/${docId}`);
        } catch (error) {
            console.error("Error saving flashcard:", error);
        }
    };

    return (
        <Card className="w-full mb-20">
            <CardHeader>
                <CardTitle>AI Generated</CardTitle>
                <CardDescription>
                    Type in a topic or text to generate flashcards with AI
                </CardDescription>
            </CardHeader>
            <CardContent>
                {flashcard.length === 0 && (
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="prompt">Topic</Label>
                            <Textarea
                                placeholder="Enter your topic to generate flashcards."
                                id="prompt"
                                name="prompt"
                                onChange={handleChange}
                                maxLength={maxLength}
                                disabled={loading}
                                value={prompt}
                            />
                            <p className="text-sm text-muted-foreground text-end">
                                {maxLength - prompt.length} characters remaining
                            </p>
                            {error && (
                                <p className="text-red-500 text-sm">{error}</p>
                            )}
                        </div>
                        <Label htmlFor="number">Number of cards</Label>
                        <Input
                            id="number"
                            type="number"
                            placeholder="Number of cards"
                            min="1"
                            max="15"
                            required
                            onChange={(e) =>
                                setNumber(parseInt(e.target.value))
                            }
                            value={number}
                        />
                        <Button
                            disabled={loading}
                            onClick={handleSubmit}
                            type="submit"
                        >
                            {loading ? "Generating Cards" : "Generate Cards"}
                        </Button>
                    </form>
                )}
                {flashcard.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold">
                            Flashcards Deck Details
                        </h3>
                        <div className="flex flex-col gap-2 w-full">
                            <div>
                                <Label htmlFor="Title">Title</Label>
                                <Input
                                    type="text"
                                    id="Title"
                                    placeholder="Enter Title..."
                                    required
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />
                            </div>
                            <div>
                                <Label htmlFor="Description">Description</Label>
                                <Input
                                    type="text"
                                    id="Description"
                                    placeholder="Enter Description..."
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <ManualFlashcards
                            cards={flashcard}
                            setCards={setFlashcard}
                            allowAdd={false}
                        />
                        <div className="flex flex-row gap-2">
                            <Checkbox
                                id="private"
                                checked={privateDeck}
                                onCheckedChange={() =>
                                    setPrivateDeck(!privateDeck)
                                }
                            />
                            <Label htmlFor="private" className="text-sm ">
                                Make the Deck Private
                            </Label>
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm mb-4">{error}</p>
                        )}
                        <Button onClick={saveFlashcard}>
                            Create Flashcard Deck
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
