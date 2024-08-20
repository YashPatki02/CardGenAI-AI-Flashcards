"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@radix-ui/react-checkbox";
import ManualFlashcards from "./ManualFlashcards";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { addFlashcard } from "@/lib/firebaseUtils";

interface Flashcard {
    front: string;
    back: string;
}

export default function UploadFile() {
    // Add types here
    const [file, setFile] = useState(null);
    const [fileLoading, setFileLoading] = useState(false);
    const [instructions, setInstructions] = useState("");
    const [error, setError] = useState("");
    const [showSubmit, setShowSubmit] = useState(false);
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

    const { currentUser } = useAuth();
    const router = useRouter();
    const [privateDeck, setPrivateDeck] = useState<boolean>(true);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");

    const handleChangeInstructions = (e: any) => {
        setInstructions(e.target.value);
    };

    useEffect(() => {
        console.log("flashcards: ", flashcards);
    }, [flashcards]);

    const handleFileChange = (e: { target: { files: any } }) => {
        console.log("in file change ", e.target.files);
        const tempfile = e.target.files[0];
        if (tempfile && tempfile.type === "application/pdf") {
            setShowSubmit(true);
            setFile(tempfile);
            setError("");
        } else {
            setError("Please upload a valid PDF file.");
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (!file) return;

        setFileLoading(true);
        setError("");

        const formData = new FormData();
        formData.set("pdfFile", file);
        formData.set("instructions", instructions);

        try {
            const res = await fetch("/api/uploadfile", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Failed to generate Q&A");
            } else {
                const data = await res.json();
                setFlashcards(data.flashcards);
            }
            //   set the flashcard here
        } catch (error: any) {
            console.error(error);
            setError(error.message);
        } finally {
            setFileLoading(false);
            setShowSubmit(false);
        }
    };

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
            questions: flashcards,
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
        <div className="w-full relative mb-20">
            {flashcards.length === 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Upload File</CardTitle>
                        <CardDescription>
                            Upload a PDF File with content to generate
                            flashcards
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-4">
                            <Label htmlFor="file" className="hidden">
                                Choose a file
                            </Label>
                            <Input
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="flex items-center justify-center text-center self-center w-[300px] h-32 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 cursor-pointer"
                            />
                            {error && (
                                <p className="text-red-500 text-sm text-center">
                                    {error}
                                </p>
                            )}
                            <Label htmlFor="instructions">Instructions</Label>
                            <Input
                                id="description"
                                type="text"
                                placeholder="Add any instructions you want in generating your flashcards. (e.g. number of cards, things you want to focus on, etc.)"
                                required
                                value={instructions}
                                onChange={handleChangeInstructions}
                            />
                            <Button
                                disabled={!showSubmit || fileLoading}
                                type="submit"
                                onClick={handleSubmit}
                            >
                                {fileLoading
                                    ? "Generating Cards..."
                                    : "Generate Cards"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardContent>
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
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        value={title}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="Description">
                                        Description
                                    </Label>
                                    <Input
                                        type="text"
                                        id="Description"
                                        placeholder="Enter Description..."
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <ManualFlashcards
                                cards={flashcards}
                                setCards={setFlashcards}
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
                                <p className="text-red-500 text-sm mb-4">
                                    {error}
                                </p>
                            )}
                            <Button onClick={saveFlashcard}>
                                Create Flashcard Deck
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
