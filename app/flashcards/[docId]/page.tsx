"use client";
import { getFlashcardByDocId } from "@/lib/firebaseUtils";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
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
    const [flashcard, setFlashcard] = useState<Flashcard>({
        id: "",
        title: "",
        description: "",
        created_at: "",
        questions: [],
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState<boolean[]>([]);
    const [viewMode, setViewMode] = useState<"single" | "all">("single");
    const [flashcardLoading, setFlashcardLoading] = useState(false);

    // useEffect(() => {
    //     setFlipped(flashcard?.questions.map(() => false));
    // }, [flashcard]);

    useEffect(() => {
        const getData = async () => {
            console.log("In getData");

            setFlashcardLoading(true);
            const data: any = await getFlashcardByDocId(
                currentUser.uid,
                params.docId
            );
            console.log("Flashcard:", data);
            if (!data) {
                console.log("error loading flashcards");
                return <> loading{params.docId}</>;
            }
            setFlashcard(data);
            setFlashcardLoading(false);
        };

        if (!isLoading && !currentUser) {
            redirect("/login");
        }

        console.log(currentUser.uid);
        getData();
    }, []);

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
        if (currentIndex < flashcard.questions.length - 1) {
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

    console.log(flashcard);
    console.log(currentUser.uid);

    if (flashcardLoading) {
        return <>loading {params.docId}</>;
    }

    return (
        <>
            {/* <div>
                <div>
                    <h1>Flashcard Details</h1>
                    <p>Title: {flashcard?.title}</p>
                    <p>Description: {flashcard?.description}</p>
                    <p>Created At: {flashcard?.created_at}</p>
                    <div>
                        {flashcard?.questions &&
                        flashcard?.questions?.length > 0 ? (
                            flashcard.questions.map((question, index) => (
                                <div key={index}>
                                    <p>
                                        <strong>Front:</strong> {question.front}
                                    </p>
                                    <p>
                                        <strong>Back:</strong> {question.back}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No questions available.</p>
                        )}
                    </div>
                </div>
            </div> */}
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

                    <p className="text-lg text-muted-foreground">
                        {flashcard?.description} - {flashcard?.created_at}
                    </p>
                    <Badge className="text-sm mr-auto">
                        {flashcard?.questions.length} Cards
                    </Badge>
                </div>

                <div className="flex flex-row items-center justify-around w-full p-2">
                    <h2
                        className={`text-lg font-semibold cursor-pointer ${
                            viewMode === "single" &&
                            "text-primary border-b-2 border-primary"
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
                            viewMode === "all" &&
                            "text-primary border-b-2 border-primary"
                        }`}
                        onClick={() => {
                            setViewMode("all");
                            setCurrentIndex(0);
                            setFlipped(flashcard?.questions.map(() => false));
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
                                    {flashcard?.questions.length}
                                </p>
                                <CardTitle className="text-center">
                                    {flipped[currentIndex]
                                        ? flashcard?.questions[currentIndex]
                                              .back
                                        : flashcard?.questions[currentIndex]
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
                    <div className="flex flex-wrap gap-4 justify-center">
                        {flashcard?.questions.map((question, index) => (
                            <Card
                                key={index}
                                className="relative w-full max-w-[250px] min-h-[300px] flex flex-col items-center justify-center p-6 cursor-pointer"
                                onClick={() => handleFlip(index)}
                            >
                                <CardContent>
                                    <p className="absolute right-0 left-0 top-6 text-center text-sm font-semibold text-primary">
                                        {index + 1}/
                                        {flashcard?.questions.length}
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
        </>
    );
}
