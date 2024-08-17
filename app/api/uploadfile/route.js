import { OpenAI } from "openai";
// use to extract text form the file
import PdfParse from "pdf-parse";
import { NextResponse } from "next/server";


export async function POST(req) {
  console.log(req);
  // const data = await req.text();
  let data;
  try {
    data = await req.formData();
    // data = await req.text();
  } catch (error) {
    console.error("Error parsing form data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to parse form data." },
      { status: 400 }
    );
  }
  // return NextResponse.json({
    // message: "recieverd text",
  // });
  const file = data.get("file");
  if (!file || file.type !== "application/pdf") {
    return NextResponse.json(
      { error: "Invalid file type. Please upload a PDF file." },
      { status: 400 }
    );
  }
  // console.log(data);
  console.log("recieved request to upload");
  try {
    const pdfBuffer = Buffer.from(await file.arrayBuffer());
    const pdfText = await extractTextFromPdf(pdfBuffer);

    // const flashcard = await getSummaryFromOpenAI(pdfText);

    return NextResponse.json({ text: pdfText });
    // return NextResponse.json({ flashcard });
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
  console.log(data);
  return data;
}

async function getFlashcards(text) {
  //! just need to copy the function from generate/route.js
  // Call the OpenAI API with the extracted text to get a summary
  // Call the OpenAI API with the extracted text to get a summary
  // You will implement this in Step 4
  return "Generated Flashcard from OpenAI";
}
