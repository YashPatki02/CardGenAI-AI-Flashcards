"use client";
import { useEffect, useState } from "react";
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
import UploadFile from "@/components/UploadFile";
import Generate from "@/components/Generate";
import ManualEntry from "@/components/ManualEntry";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const Create = () => {
    const [selected, setSelected] = useState("manual");
    const { currentUser, isLoading } = useAuth();
    const tabs = [
        { id: "manual", label: "Manual Entry" },
        { id: "aigen", label: "AI Generated" },
        { id: "upload", label: "Upload File" },
        { id: "youtube", label: "YouTube URL" },
    ];
    useEffect(() => {
    if (!isLoading) {
        if (!currentUser) {
        redirect("/login");
        }
    }
    }, [currentUser,isLoading]);

    if (isLoading) {
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
            {selected === "manual" && <ManualEntry />}
            {selected === "aigen" && <Generate />}
            {selected === "upload" && <UploadFile />}
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
