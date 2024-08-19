"use client";
import { getFlashcardByDocId } from "@/lib/firebaseUtils";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Flashcard({ params }: { params: { docId: string } }) {
    interface Question {
        front: string;
        back: string;
    }

    interface Flashcard {
        id: string;
        title: string;
        description: string;
        created_at: string;
        questions: Question[];
    }

    const { currentUser, isLoading } = useAuth();
    const [flashcard, setFlashcard] = useState<Flashcard | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState<boolean[]>([]);
    const [viewMode, setViewMode] = useState<"single" | "all">("single");
    const [flashcardLoading, setFlashcardLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setFlashcardLoading(true);
            try {
                const data: any = await getFlashcardByDocId(
                    currentUser!.uid,
                    params.docId
                );
                if (data) {
                    setFlashcard(data);
                    setFlipped(data.questions.map(() => false));
                } else {
                    console.error("Error loading flashcards");
                }
            } catch (error) {
                console.error("Error fetching flashcard:", error);
            } finally {
                setFlashcardLoading(false);
            }
        };

        if (!isLoading) {
            if (currentUser) {
                getData();
            } else {
                redirect("/login");
            }
        }
    }, [currentUser, isLoading, params.docId]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowRight":
                    handleNext();
                    break;
                case "ArrowLeft":
                    handlePrev();
                    break;
                case "ArrowUp":
                    event.preventDefault();
                    handleFlip(currentIndex);
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    handleFlip(currentIndex);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [flipped, currentIndex]);

    const handleNext = () => {
        if (currentIndex < flashcard!.questions.length - 1) {
            setFlipped((prevFlipped) =>
                prevFlipped.map((flip, index) =>
                    index === currentIndex ? false : flip
                )
            );
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setFlipped((prevFlipped) =>
                prevFlipped.map((flip, index) =>
                    index === currentIndex ? false : flip
                )
            );
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleFlip = (index: number) => {
        setFlipped((prevFlipped) =>
            prevFlipped.map((flip, idx) => (idx === index ? !flip : flip))
        );
    };

    if (isLoading || flashcardLoading || !flashcard) {
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
        <section className="container flex flex-col items-start gap-8 pt-8 px-8 md:px-20 sm:gap-10 min-h-screen mb-20">
            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-2xl font-bold md:text-3xl">
                        {flashcard?.title}
                    </h1>
                    <div className="flex flex-row gap-4">
                        <Button
                            className="text-md font-semibold"
                            size="default"
                            variant="destructive"
                        >
                            Delete
                        </Button>
                    </div>
                </div>

                <p className="text-md text-muted-foreground">
                    {flashcard?.description}
                </p>
                <Badge className="text-sm mr-auto">
                    {flashcard?.questions.length} Cards
                </Badge>
            </div>

            <div className="flex flex-row items-center justify-around w-full p-2">
                <h2
                    className={`text-xl font-semibold cursor-pointer hover:text-primary ${
                        viewMode === "single" &&
                        "text-primary border-b-2 border-primary"
                    }`}
                    onClick={() => {
                        setViewMode("single");
                        setCurrentIndex(0);
                    }}
                >
                    Single Card
                </h2>
                <h2
                    className={`text-xl font-semibold cursor-pointer hover:text-primary ${
                        viewMode === "all" &&
                        "text-primary border-b-2 border-primary"
                    }`}
                    onClick={() => {
                        setViewMode("all");
                        setCurrentIndex(0);
                        setFlipped(flashcard?.questions.map(() => false));
                    }}
                >
                    All Cards
                </h2>
            </div>

            {viewMode === "single" ? (
                <div className="flex flex-row items-center justify-center gap-4 md:gap-16 lg:gap-32 w-full">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handlePrev}
                                    disabled={currentIndex === 0}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Left Arrow</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <Card
                        className="relative w-full max-w-[300px] min-h-[400px] flex flex-col items-center justify-center py-6 px-2 cursor-pointer"
                        onClick={() => handleFlip(currentIndex)}
                    >
                        <CardContent>
                            <p className="absolute right-0 left-0 top-4 text-center text-sm font-semibold text-primary">
                                {currentIndex + 1}/{flashcard?.questions.length}
                            </p>
                            <CardTitle className="text-center text-md leading-tight md:text-xl md:font-semibold text-wrap">
                                {flipped[currentIndex]
                                    ? flashcard?.questions[currentIndex].back
                                    : flashcard?.questions[currentIndex].front}
                            </CardTitle>
                            <p className="absolute bottom-6 right-0 left-0 text-center text-sm text-muted-foreground">
                                {flipped[currentIndex] ? "Back" : "Front"}
                            </p>
                        </CardContent>
                    </Card>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleNext}
                                    disabled={
                                        currentIndex ===
                                        flashcard?.questions.length - 1
                                    }
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Right Arrow</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            ) : (
                <div className="flex flex-row items-center justify-center w-full">
                    <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {flashcard?.questions.map(
                            (question: Question, index: number) => (
                                <Card
                                    key={index}
                                    className="relative min-w-[280px] min-h-[400px] flex flex-row items-center justify-center px-6 cursor-pointer"
                                    onClick={() => handleFlip(index)}
                                >
                                    <CardContent>
                                        <p className="absolute right-0 left-0 top-6 text-center text-sm font-semibold text-primary">
                                            {index + 1}/
                                            {flashcard?.questions.length}
                                        </p>
                                        <CardTitle className="text-center text-md text-wrap">
                                            {flipped[index]
                                                ? question.back
                                                : question.front}
                                        </CardTitle>
                                        <p className="absolute bottom-8 right-0 left-0 text-center text-sm text-muted-foreground">
                                            {flipped[index] ? "Back" : "Front"}
                                        </p>
                                    </CardContent>
                                </Card>
                            )
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
