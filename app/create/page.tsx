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
import { redirect, useRouter } from "next/navigation";
import { LoaderCircle, X } from "lucide-react";
import {
    getFlashcardsByUserId,
    getUserById
} from "@/lib/firebaseUtils";
import Link from "next/link";

const Create = () => {
    const [selected, setSelected] = useState("manual");
    const { currentUser, isLoading } = useAuth();
    const [flashcards, setFlashcards] = useState<any[]>([]);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [userSubscription, setUserSubscription] = useState<string | null>(
        null
    );
    const router = useRouter();

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
            } else {
                const getFlashcards = async () => {
                    try {
                        const data: any = await getFlashcardsByUserId(
                            currentUser.uid
                        );
                        setFlashcards(data);
                    } catch (err) {
                        console.log(err);
                    }
                };

                getFlashcards();
            }
        }
    }, [currentUser, isLoading, flashcards]);

    useEffect(() => {
        const getSubscription = async () => {
            try {
                const userData: any = await getUserById(currentUser.uid);
                setUserSubscription(userData.subscription);
            } catch (err) {
                console.log(err);
            }
        };

        if (currentUser) {
            getSubscription();
        }
    }, [currentUser]);

    useEffect(() => {
        if (flashcards.length >= 3 && userSubscription === "Free") {
            setShowUpgradeModal(true);
        }
    }, [flashcards, userSubscription]);

    const handleOverlayClick = (e: any) => {
        if (e.target.id === "overlay") {
            router.push("/flashcards");
        }
    };

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
        <section className="container relative flex flex-col items-start gap-8 pt-8 px-8 md:px-20 sm:gap-10 min-h-screen">
            {showUpgradeModal && (
                <div
                    id="overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20"
                    onClick={handleOverlayClick}
                >
                    <div className="relative bg-white dark:bg-gray-800 px-8 py-12 border-2 rounded-lg shadow-md max-w-lg w-full z-30">
                        <h2 className="text-2xl font-semibold">
                            You Have Reached Limit of 3 Decks for the Free Plan
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Upgrade to create more decks
                        </p>
                        <div className="mt-4 flex gap-4">
                            <Link href="/pricing">
                                <Button>Upgrade Now</Button>
                            </Link>
                            <Link href="/flashcards">
                                <Button variant="ghost">Back to Decks</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

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
                                max="20"
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
