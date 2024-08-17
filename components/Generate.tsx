"use client";
import React from "react";
import { useState } from "react";
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
import { useAuth } from "@/context/AuthContext";

export default function Generate() {
  interface Flashcard {
    front: string;
    back: string;
  }
  // !states for generate
  const [flashcard, setFlashcard] = useState<Flashcard[]>([
    {
      front: "What is React?",
      back: "A JavaScript library for building user interfaces.",
    },
    {
      front: "What is TypeScript?",
      back: "A typed superset of JavaScript that compiles to plain JavaScript.",
    },
    {
      front: "What is Tailwind CSS?",
      back: "A utility-first CSS framework for rapid UI development.",
    },
  ]);
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const maxLength = 4000;
  // !
  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPrompt(e.target.value);
  };

  //!  handle submit for generate
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
        body: prompt,
      });
      setPrompt("");
      //extracting the data
      const data = await response.json();
      //   console.log(data);
      setFlashcard(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //   !
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  //   const saveFlashcard = () => {
  //     if (!title) {
  //       return;
  //     }
  //     // check if the title already exist

  //     // else save to base
  //   };
  const { currentUser } = useAuth();
  const saveFlashcards = async () => {
    if (!title.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }
    //! add to the data base
  };
  return (
    <>
      <div className="grid w-full gap-2">
        {error && <p className="text-red-500">{error}</p>}
        <textarea
          id="prompt"
          name="prompt"
          placeholder="Enter your text here..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          maxLength={maxLength}
          onChange={handleChange}
          disabled={loading}
        ></textarea>
        <div className="text-right text-sm text-gray-500">
          {maxLength - prompt.length} characters remaining
        </div>
        <Button disabled={loading} onClick={handleSubmit}>
          {loading ? "Generating..." : "Generate Flashcards"}
        </Button>
      </div>
      {/* {true && ( */}
      {flashcard.length > 0 && (
        <div className="grid grid-cols-1 gap-4 w-full mt-3">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Title">Title</Label>
            <Input
              type="text"
              id="Title"
              placeholder="Enter Title..."
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Description">Description</Label>
            <Input
              type="text"
              id="Description"
              placeholder="Enter Description..."
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {flashcard.map((card, index) => (
            <div key={index} className="flex flex-row grow w-full">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Question {index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{card.front}</p>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Answer {index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{card.back}</p>
                </CardContent>
              </Card>
            </div>
          ))}
          <div>
            <Button onClick={saveFlashcards}>Create Flashcard</Button>
          </div>
        </div>
      )}
    </>
  );
}
