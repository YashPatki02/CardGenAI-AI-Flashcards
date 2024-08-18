"use client";
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import ManualFlashcards from "@/components/ManualFlashcards";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Create = () => {
    const [selected, setSelected] = useState("manual");
    const [cards, setCards] = useState<{ front: string; back: string }[]>([
        { front: "", back: "" },
    ]);

    const tabs = [
        { id: "manual", label: "Manual Entry" },
        { id: "aigen", label: "AI Generated" },
        { id: "upload", label: "Upload File" },
        { id: "youtube", label: "YouTube URL" },
    ];

    return (
        <section className="container flex flex-col items-start gap-8 pt-8 px-8 md:px-20 sm:gap-10 min-h-screen">
            <h2 className="text-2xl font-semibold">
                Create a New Flashcard Deck
            </h2>
            <div className="w-full flex flex-row gap-6 flex-wrap md:gap-14">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={cn(
                            "cursor-pointer pb-2",
                            selected === tab.id
                                ? "font-semibold border-b-2 border-primary"
                                : "text-muted-foreground"
                        )}
                        onClick={() => setSelected(tab.id)}
                    >
                        <h3 className="text-md">{tab.label}</h3>
                    </div>
                ))}
            </div>
            {selected === "manual" && (
                <Card className="w-full mb-20">
                    <CardHeader>
                        <CardTitle>Manual Entry</CardTitle>
                        <CardDescription>
                            Enter the front and back of the flashcard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-4">
                            <Label htmlFor="topic">Topic</Label>
                            <Input id="topic" type="text" placeholder="Topic" />
                            <Label htmlFor="number">Description</Label>
                            <Input
                                id="description"
                                type="text"
                                placeholder="Description"
                            />
                        </form>
                        <ManualFlashcards cards={cards} setCards={setCards} />
                        <Separator className="my-4" />
                        <Button
                            onClick={() => console.log(cards)}
                            className="w-full"
                        >
                            Generate Cards
                        </Button>
                    </CardContent>
                </Card>
            )}
            {selected === "aigen" && (
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>AI Generated</CardTitle>
                        <CardDescription>
                            Type in a topic to generate flashcards with AI
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-4">
                            <Label htmlFor="topic">Topic</Label>
                            <Input id="topic" type="text" placeholder="Topic" />
                            <Label htmlFor="number">Number of cards</Label>
                            <Input
                                id="number"
                                type="number"
                                placeholder="Number of cards"
                                min="1"
                                max="15"
                            />
                            <Button type="submit">Generate Cards</Button>
                        </form>
                    </CardContent>
                </Card>
            )}
            {selected === "upload" && (
                <Card className="w-full relative">
                    <Badge className="bg-primary text-white p-2 rounded-md absolute -right-3 -top-3">
                        Coming Soon
                    </Badge>
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
                            <Input id="file" type="file" className="" />
                            <Label htmlFor="number">Number of cards</Label>
                            <Input
                                id="number"
                                type="number"
                                placeholder="Number of cards"
                                min="1"
                                max="15"
                            />
                            <Button type="submit">Generate Cards</Button>
                        </form>
                    </CardContent>
                </Card>
            )}
            {selected === "youtube" && (
                <Card className="w-full relative">
                    <Badge className="bg-primary text-white p-2 rounded-md absolute -right-3 -top-3">
                        Coming Soon
                    </Badge>
                    <CardHeader>
                        <CardTitle>YouTube URL</CardTitle>
                        <CardDescription>
                            Enter a YouTube URL to generate flashcards
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-4">
                            <Label htmlFor="youtube-url">YouTube URL</Label>
                            <Input
                                id="youtube-url"
                                type="text"
                                placeholder="YouTube URL"
                            />
                            <Label htmlFor="number">Number of cards</Label>
                            <Input
                                id="number"
                                type="number"
                                placeholder="Number of cards"
                                min="1"
                                max="15"
                            />
                            <Button type="submit">Generate Cards</Button>
                        </form>
                    </CardContent>
                </Card>
            )}
        </section>
    );
};

export default Create;
