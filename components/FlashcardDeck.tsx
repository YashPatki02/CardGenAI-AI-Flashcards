import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FlashcardDeckProps {
  title: string;
  description: string;
  creator: string;
  createdAt: string;
  docID: string;
}

const FlashcardDeckCard = ({
  title,
  description,
  creator,
  createdAt,
  docID,
}: FlashcardDeckProps) => {
  return (
    <Card className="w-full md:w-[360px] lg:w-[320px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">Created by: {creator}</p>
        <p className="text-sm text-muted-foreground">Date: {createdAt}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href={`/flashcards/${docID}`} passHref>
          <Button variant="outline">View Deck</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FlashcardDeckCard;
