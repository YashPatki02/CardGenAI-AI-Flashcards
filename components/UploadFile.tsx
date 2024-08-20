"use client";
import React from "react";
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
import { Badge } from "@/components/ui/badge";

export default function UploadFile() {
    // Add types here
    const [file, setFile] = useState(null);
    const [fileLoading, setFileLoading] = useState(false);
    const [instructions, setInstructions] = useState("");
    const [error, setError] = useState("");
    const [showSubmit, setShowSubmit] = useState(false);
    const [cardList, setCardList] = useState([]);

    const handleChangeInstructions = (e: any) => {
        setInstructions(e.target.value);
    };

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
        setCardList([]);

        const formData = new FormData();
        console.log("file in submit: ", file);
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
                console.log(data);
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
    return (
        <Card className="w-full relative mb-20">
            <Badge className="bg-primary text-white p-2 rounded-md absolute -right-3 -top-3">
                Coming Soon
            </Badge>
            <CardHeader>
                <CardTitle>Upload File</CardTitle>
                <CardDescription>
                    Upload a PDF File with content to generate flashcards
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
                        {fileLoading ? "Generating Cards..." : "Generate Cards"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
