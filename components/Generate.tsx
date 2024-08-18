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
import { addFlashcard } from "@/lib/firebaseUtils";

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

  const { currentUser } = useAuth();
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
      alert("Please enter a name for your flashcard set.");
      return;
    }
    //! add to the database
    const flashcard_obj = {
      title: title,
      description: description,
      private: true,
      questions: flashcard,
      created_at: getFormattedDate(),
    };
    console.log(flashcard_obj);
    try {
      const userId = "eKlEoznoXBbABrBN4tjIf7ycECu1"; //! Replace this
      const docId = await addFlashcard(userId, flashcard_obj);
      console.log("Flashcard added successfully");
    } catch (error) {
      console.error("Error saving flashcard:", error);
    }
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
        // ! gets the Title and description
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* Maps the flashcards */}
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
            <Button onClick={saveFlashcard}>Create Flashcard</Button>
          </div>
        </div>
      )}
    </>
  );
}
