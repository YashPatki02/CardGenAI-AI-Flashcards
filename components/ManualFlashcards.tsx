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
import { Plus } from "lucide-react";

interface ManualFlashcardsProps {
    cards: { front: string; back: string }[];
    setCards: React.Dispatch<
        React.SetStateAction<{ front: string; back: string }[]>
    >;
}

const ManualFlashcards = ({ cards, setCards }: ManualFlashcardsProps) => {
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    const handleAddCard = (e: React.FormEvent) => {
        e.preventDefault();
        if (front && back) {
            setCards([...cards, { front, back }]);
            setFront("");
            setBack("");
        }
    };

    const addCard = () => {
        setCards([...cards, { front: "", back: "" }]);
    };

    return (
        <>
            <form className="flex flex-col gap-2" onSubmit={handleAddCard}>
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="flex flex-row gap-4 items-start border-b border-gray-200 py-4"
                    >
                        <div className="rounded-full bg-primary text-white p-3 w-4 h-4 items-center justify-center flex">
                            <p className="text-sm">{index + 1}</p>
                        </div>
                        <div className="w-1/2">
                            <Label htmlFor="front" className="text-sm">
                                Front
                            </Label>
                            <Input
                                id="front"
                                type="text"
                                placeholder="Front of the card"
                                value={card.front}
                                onChange={(e) => {
                                    const updatedCards = [...cards];
                                    updatedCards[index].front = e.target.value;
                                    setCards(updatedCards);
                                }}
                            />
                        </div>
                        <div className="w-1/2">
                            <Label htmlFor="back">Back</Label>
                            <Input
                                id="back"
                                type="text"
                                placeholder="Back of the card"
                                value={card.back}
                                onChange={(e) => {
                                    const updatedCards = [...cards];
                                    updatedCards[index].back = e.target.value;
                                    setCards(updatedCards);
                                }}
                            />
                        </div>
                    </div>
                ))}
                <div className="flex gap-4 mx-auto">
                    <Button onClick={addCard}>
                        <Plus size={18} className="mr-2" /> Add Card
                    </Button>
                </div>
            </form>
        </>
    );
};

export default ManualFlashcards;
