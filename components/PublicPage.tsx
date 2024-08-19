import React from "react";
import FlashcardDeck from "./FlashcardDeck";

const PublicPage = () => {
    const flashcards = [
        {
            id: "1",
            title: "Spanish Vocabulary",
            description:
                "A deck of flashcards to help you learn Spanish vocabulary",
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
    ];

    return (
        <section className="container flex flex-col items-start gap-8 pt-8 px-8 md:px-20 sm:gap-10 min-h-screen">
            <h1 className="text-xl font-semibold sm:text-2xl">
                Your Recent Decks
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-start w-full gap-8 mt-2 mb-12">
                {flashcards.map((flashcard) => (
                    <FlashcardDeck
                        key={flashcard?.id}
                        title={flashcard?.title}
                        description={flashcard?.description}
                        numberCards={flashcard?.questions.length}
                        creator={flashcard?.creator}
                        createdAt={flashcard?.created_at}
                        docID={flashcard?.id}
                    />
                ))}
            </div>
        </section>
    );
};

export default PublicPage;
