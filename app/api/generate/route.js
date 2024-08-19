import { NextResponse } from "next/server";
import OpenAI from "openai";

// ! change the system prompt to make it more specific
const getSystemPrompt = (number) => `
You are a knowledgable, flashcard creator and teacher. You take general or specific text and create ${number} flashcards for study material. Make sure to create exactly ${number} flashcards, and make them as informative as possible.
Both front and back can range from a word to one sentence long (max 140 characters).
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`;

export async function POST(req) {
    const openai = new OpenAI();
    const { prompt, number } = await req.json();
    const systemPrompt = getSystemPrompt(number);

    // ! can add condition to change the response of the model
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
    });

    // getting the data
    const data = JSON.parse(completion.choices[0].message.content);
    console.log("Genrate the responce");
    console.log(data.flashcards);
    // sending the data
    return NextResponse.json(data.flashcards);
}
