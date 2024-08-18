import { getFlashcardByDocId } from "@/lib/firebaseUtils";
import React from "react";
import { useAuth } from "@/context/AuthContext";

export default async function Flashcard({
  params,
}: {
  params: { docId: string };
}) {
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
  const userId = "eKlEoznoXBbABrBN4tjIf7ycECu1"; // Replace with actual user ID

  const flashcard: Flashcard | null = await getFlashcardByDocId(userId, params.docId);
  console.log(flashcard);
  if (!flashcard) {
    // If flashcard is not found, trigger a 404 error
    // notFound();
    console.log("error loading flashcards");
    return <> loading{params.docId}</>;
  }
  return (
    <div>
      <div>
        <h1>Flashcard Details</h1>
        <p>Title: {flashcard.title}</p>
        <p>Description: {flashcard.description}</p>
        <p>Created At: {flashcard.created_at}</p>
        <div>
          {flashcard.questions && flashcard.questions.length > 0 ? (
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
