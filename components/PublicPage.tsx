import { useAuth } from "@/context/AuthContext";
import {
  getFlashcardsForAllUsers,
  getFlashcardsByUserId,
  getUserById,
} from "@/lib/firebaseUtils";
import { error } from "console";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import FlashcardDeck from "./FlashcardDeck";

const PublicPage = () => {
  const { currentUser, isLoading } = useAuth();
  const [publicFlashcard, setPublicFlashcard] = useState();
  const [flashcards, setFlashcards] = useState([]);
  const [userData, setUserData] = useState<any | null>(null);
  // *
  useEffect(() => {
    async function getPublicFlashcard() {
      try {
        const data: any = await getFlashcardsForAllUsers(currentUser.uid);
        if (data !== []) {
          setPublicFlashcard(data);
          console.log("successfully added");
          console.log(data);
        } else {
          throw Error("data is empty");
        }
      } catch (error) {
        console.log("unable to get data");
        console.log(error);
      }
    }
    async function userFlashcard() {
      try {
        console.log(currentUser.uid);
        const data = await getFlashcardsByUserId(currentUser!.uid);
        console.log(data);
        if (data) {
          setFlashcards(data.slice(0,3));
          console.log("successfully retrive user flashcard");
          console.log(data);
        } else {
          throw Error("data is empty");
        }
      } catch (err) {
        console.log("unable to get user flashcard");
        console.log(err);
      }
    }
    const getUserData = async () => {
      if (currentUser) {
        try {
          const data = await getUserById(currentUser?.uid);
          if (data) {
            console.log(data);
            setUserData(data);
          } else {
            console.log("No user data found");
            setUserData(null);
          }
        } catch (error) {
          console.error("Error loading user data:");
        }
      }
    };
    if (currentUser) {
      userFlashcard();
      getPublicFlashcard();
      getUserData();
    }
  }, [currentUser]);

  /* const flashcards = [
    {
      id: "1",
      title: "Spanish Vocabulary",
      description: "A deck of flashcards to help you learn Spanish vocabulary",
      questions: [
        {
          front: "Hola",
          back: "Hello",
        },
        {
          front: "Adios",
          back: "Goodbye",
        },
      ],
      creator: "John Doe",
      created_at: "2022-01-01",
    },
    {
      id: "2",
      title: "Biology Terms",
      description: "A deck of flashcards to help you learn biology terms",
      questions: [
        {
          front: "Mitochondria",
          back: "The powerhouse of the cell",
        },
        {
          front: "Ribosome",
          back: "Protein synthesis",
        },
      ],
      creator: "Jane Doe",
      created_at: "2022-01-01",
    },
  ]; */
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pb-20">
        <LoaderCircle size={48} className="animate-spin text-primary" />
      </div>
    );
  } else {
    return (
      <>
        <section className="container flex flex-col items-start gap-8 pt-8 px-8 md:px-20 sm:gap-10 ">
          <h1 className="text-xl font-semibold sm:text-2xl">
            Your Recent Decks
          </h1>
          {flashcards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-start w-full gap-8 mt-2 mb-12">
              {flashcards.map((flashcard) => (
                <FlashcardDeck
                  key={flashcard?.id}
                  title={flashcard?.title}
                  description={flashcard?.description}
                  numberCards={flashcard?.questions.length}
                  creator={userData?.firstName + " " + userData?.lastName}
                  createdAt={flashcard?.created_at}
                  docID={flashcard?.id}
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex items-start justify-center font-semibold text-2xl h-screen mt-20">
              No Flashcard Decks Found, Create One Now!
            </div>
          )}
        </section>
        <section className="container flex flex-col items-start gap-8 pt-8 px-8 md:px-20 sm:gap-10 ">
          <h1 className="text-xl font-semibold sm:text-2xl">
            Public Flashcards
          </h1>
          {flashcards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-start w-full gap-8 mt-2 mb-12">
              {flashcards.map((flashcard) => (
                <FlashcardDeck
                  key={flashcard?.id}
                  title={flashcard?.title}
                  description={flashcard?.description}
                  numberCards={flashcard?.questions.length}
                  creator={userData?.firstName + " " + userData?.lastName}
                  createdAt={flashcard?.created_at}
                  docID={flashcard?.id}
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex items-start justify-center font-semibold text-2xl h-screen mt-20">
              No Flashcard Decks Found, Create One Now!
            </div>
          )}
        </section>
      </>
    );
  }
};

export default PublicPage;
