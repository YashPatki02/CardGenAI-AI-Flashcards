"use client";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext'
import { redirect } from 'next/navigation'
import FlashcardDeck from '@/components/FlashcardDeck'

const Flashcards = () => {
  const { currentUser } = useAuth()

  if (!currentUser) {
    redirect('/login')
  }

  return (
      <section className="container flex flex-col items-center gap-8 pt-16 px-20 sm:gap-10 min-h-screen">
          <div className="flex flex-row items-start justify-between w-full">
              <h1 className="text-3xl font-bold">Your Decks</h1>
              <Button
                  onClick={() => redirect("/flashcards/new")}
                  className="text-md font-semibold"
                  size="lg"
              >
                  Create Deck
              </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-start w-full gap-8 mt-8">
              <FlashcardDeck
                  title="Deck 1"
                  description="This is a description for Deck 1"
                  creator="John Doe"
                  createdAt="2024-08-16"
              />
              <FlashcardDeck
                  title="Deck 2"
                  description="This is a description for Deck 2"
                  creator="Jane Smith"
                  createdAt="2024-08-15"
              />
          </div>
      </section>
  );
}

export default Flashcards