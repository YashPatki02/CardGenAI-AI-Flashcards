"use client";
import { getFlashcardByDocId } from "@/lib/firebaseUtils";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function Flashcard({ params }: { params: { docId: string } }) {
  interface Question {
    front: string;
    back: string;
  }

  interface Flashcard {
    title: string;
    description: string;
    created_at: string;
    questions: Question[];
  }
  // !
  const { currentUser, isLoading } = useAuth();
  // !
  const [flashcard, setFlashcard] = useState<Flashcard>();
  //
  useEffect(() => {
    const getData = async () => {
      const data: Flashcard | null = await getFlashcardByDocId(
        currentUser.uid,
        params.docId
      );
      console.log(data);
      if (!data) {
        console.log("error loading flashcards");
        return <> loading{params.docId}</>;
      }
      setFlashcard(data);
    };
    if (isLoading && !currentUser) {
      //
      console.log("no current users");
      //
      return redirect("/login");
    }
    getData();
  }, []);

  return (
    <div>
      <div>
        <h1>Flashcard Details</h1>
        <p>Title: {flashcard?.title}</p>
        <p>Description: {flashcard?.description}</p>
        <p>Created At: {flashcard?.created_at}</p>
        <div>
          {flashcard?.questions && flashcard?.questions?.length > 0 ? (
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
    </div>
  );
}
