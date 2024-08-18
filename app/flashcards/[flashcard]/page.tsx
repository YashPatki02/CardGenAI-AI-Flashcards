"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Flashcard({
    params,
}: {
    params: { flashcard: string };
}) {
    const [flashcardDeck] = useState({
        title: "European Capitals",
        description: "Test your knowledge of European capitals",
        private: false,
        questions: [
            { front: "What is the capital of France?", back: "Paris" },
            { front: "What is the capital of Spain?", back: "Madrid" },
            { front: "What is the capital of Portugal?", back: "Lisbon" },
            { front: "What is the capital of Italy?", back: "Rome" },
            { front: "What is the capital of Germany?", back: "Berlin" },
            {
                front: "What is the capital of the United Kingdom?",
                back: "London",
            },
            {
                front: "What is the capital of the United States?",
                back: "Washington D.C.",
            },
            { front: "What is the capital of Canada?", back: "Ottawa" },
            { front: "What is the capital of Australia?", back: "Canberra" },
        ],
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState<boolean[]>(
        flashcardDeck.questions.map(() => false)
    );
    const [viewMode, setViewMode] = useState<"single" | "all">("single");

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
        if (currentIndex < flashcardDeck.questions.length - 1) {
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

    return (
        <section className="container flex flex-col items-start gap-8 pt-8 px-8 md:px-20 sm:gap-10 min-h-screen mb-20">
            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-2xl font-bold md:text-3xl">
                        {flashcardDeck.title}
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

                <p className="text-lg text-muted-foreground">
                    {flashcardDeck.description}
                </p>
                <Badge className="text-sm mr-auto">
                    {flashcardDeck.questions.length} Cards
                </Badge>
            </div>

            <div className="flex flex-row items-center justify-around w-full p-2">
                <h2
                    className={`text-lg font-semibold cursor-pointer ${
                        viewMode === "single" && "text-primary border-b-2 border-primary"
                    }`}
                    onClick={() => {
                        setViewMode("single");
                        setCurrentIndex(0);
                    }}
                >
                    View Single Card
                </h2>
                <h2
                    className={`text-lg font-semibold cursor-pointer ${
                        viewMode === "all" && "text-primary border-b-2 border-primary"
                    }`}
                    onClick={() => {
                        setViewMode("all");
                        setCurrentIndex(0);
                        setFlipped(flashcardDeck.questions.map(() => false));
                    }}
                >
                    View All Cards
                </h2>
            </div>

            {viewMode === "single" ? (
                <div className="flex flex-row items-center justify-center gap-40 w-full">
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
                        className="relative w-full max-w-[300px] min-h-[400px] flex flex-col items-center justify-center p-6 cursor-pointer"
                        onClick={() => handleFlip(currentIndex)}
                    >
                        <CardContent>
                            <p className="absolute right-0 left-0 top-6 text-center text-sm font-semibold text-primary">
                                {currentIndex + 1}/
                                {flashcardDeck.questions.length}
                            </p>
                            <CardTitle className="text-center">
                                {flipped[currentIndex]
                                    ? flashcardDeck.questions[currentIndex].back
                                    : flashcardDeck.questions[currentIndex]
                                          .front}
                            </CardTitle>
                            <p className="absolute bottom-8 right-0 left-0 text-center text-sm text-muted-foreground">
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
                                        flashcardDeck.questions.length - 1
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
                <div className="flex flex-wrap gap-4 justify-center">
                    {flashcardDeck.questions.map((question, index) => (
                        <Card
                            key={index}
                            className="relative w-full max-w-[250px] min-h-[300px] flex flex-col items-center justify-center p-6 cursor-pointer"
                            onClick={() => handleFlip(index)}
                        >
                            <CardContent>
                                <p className="absolute right-0 left-0 top-6 text-center text-sm font-semibold text-primary">
                                    {index + 1}/{flashcardDeck.questions.length}
                                </p>
                                <CardTitle className="text-center">
                                    {flipped[index]
                                        ? question.back
                                        : question.front}
                                </CardTitle>
                                <p className="absolute bottom-8 right-0 left-0 text-center text-sm text-muted-foreground">
                                    {flipped[index] ? "Back" : "Front"}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    );
}
