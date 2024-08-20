import { OpenAI } from "openai";
import PdfParse from "pdf-parse";
import { NextResponse } from "next/server";

/** TODO
 *  Clean up the try catch blocks by catching specific errors
 *  Add limiter to number of flashcards created by GPT
 */

export async function POST(req) {
    let formData;
    try {
        formData = await req.formData();
    } catch (error) {
        console.error("Error parsing form data:", error);
        return NextResponse.json(
            { success: false, error: "Failed to parse form data." },
            { status: 405 }
        );
    }
    const file = formData.get("pdfFile");
    const instructions = formData.get("instructions");
    if (!file || file.type !== "application/pdf") {
        return NextResponse.json(
            { error: "Invalid file type. Please upload a PDF file." },
            { status: 406 }
        );
    }
    try {
        const pdfBuffer = Buffer.from(await file.arrayBuffer());
        const pdfText = await extractTextFromPdf(pdfBuffer);
        try {
            const flashcards = await getFlashcards(pdfText, instructions);
            return NextResponse.json({ flashcards });
        } catch (error) {
            console.error("Error generating cards:", error);
            return NextResponse.json(
                {
                    success: false,
                    error: "Failed to generate flashcards with OpenAI.",
                },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Error processing PDF:", error);
        return NextResponse.json(
            { success: false, error: "Failed to process the PDF." },
            { status: 500 }
        );
    }
}

async function extractTextFromPdf(pdfBuffer) {
    const result = await PdfParse(pdfBuffer);
    const data = result.text;
    return data;
}

async function getFlashcards(pdfText, instructions) {
    const openai = new OpenAI();
    const systemPrompt = createSystemPrompt(pdfText);

    // ! can add condition to change the response of the model
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: instructions },
        ],
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
    });

    // Any way to ensure GPT won't mess up and not provide JSON data in the format we want?
    const data = JSON.parse(completion.choices[0].message.content);
    return data.flashcards;
}

// Need to add a limit to amount of flashcards
const createSystemPrompt = (pdfText) => `
You are a knowledgable, flashcard creator and teacher. Your task is to read text parsed from a PDF and create flashcards for study material. Use instructions provided to you by the user to generate the flashcards.

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

This is the the text from the PDF you'll be using to create the flashcards:
${pdfText}
`;
