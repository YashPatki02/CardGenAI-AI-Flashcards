import { NextResponse } from "next/server";
import OpenAI from "openai";

// ! change the system prompt to make it more specific
const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
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
  const text = await req.text();
  console.log(text);
  console.log("recieve request");

  //! can add condition to change the response of the model
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: text },
    ],
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });

  // getting the data
  const data = JSON.parse(completion.choices[0].message.content);
  console.log("Genrate the responce");
  console.log(data.flashcards);
  // sending the data
  return NextResponse.json(data.flashcards);
}
