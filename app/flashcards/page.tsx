"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import FlashcardDeck from "@/components/FlashcardDeck";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFlashcardsByUserId } from "@/lib/firebaseUtils";

const Flashcards = () => {
  const { isLoading, currentUser } = useAuth();
  const router = useRouter();

  //   !
  const [flashcards, setFlashcards] = useState([]);
  useEffect(() => {
    const getData = async () => {
      // const id = "eKlEoznoXBbABrBN4tjIf7ycECu1"; // Replace with dynamic ID if necessary
      const id = currentUser.uid;
      //   const id = currentUser.uid;
      try {
        const data = await getFlashcardsByUserId(id);
        console.log("Flashcards:", data);
        setFlashcards(data);
        // Handle flashcards data
      } catch (error) {
        console.error("Error loading flashcards:");
      }
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
    <section className="container flex flex-col items-center gap-8 pt-16 px-20 sm:gap-10 min-h-screen">
      <div className="flex flex-row items-start justify-between w-full">
        <h1 className="text-3xl font-bold">Your Decks</h1>
        <Button
          onClick={() => router.push("/flashcards/upload")}
          className="text-md font-semibold"
          size="lg"
        >
          Create Deck
        </Button>
      </div>
      {flashcards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-start w-full gap-8 mt-8">
          {flashcards.map((flashcard) => (
            <FlashcardDeck
              key={flashcard?.id}
              title={flashcard?.title}
              description={flashcard?.description}
              creator="John Doe" //! Replace or remove as needed
              createdAt={flashcard?.created_at}
              docID={flashcard?.id}
            />
          ))}
        </div>
      ) : (
        <div>Create new flashcard by clicking create flashcard button</div>
      )}
    </section>
  );
};

export default Flashcards;
