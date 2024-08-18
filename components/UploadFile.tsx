"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// For upload
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Generate from "@/components/Generate";

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ShowSubmit, setShowSubmit] = useState(false);
  const [qaList, setQaList] = useState([]);

  //
  const handleFileChange = (e: { target: { files: any[] } }) => {
    // setFile(e.target.files[0]);
    console.log(e.target.files);
    const Tempfile = e.target.files[0];
    if (Tempfile && Tempfile.type === "application/pdf") {
      console.log("here");
      setShowSubmit(true);
      setFile(Tempfile);
      setError("");
    } else {
      setError("Please upload a valid PDF file.");
      alert("Please upload a valid PDF file.");
    }
  };
  //! haveing problem with the below function
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError("");
    setQaList([]);

    const formData = new FormData();
    console.log(file);
    formData.set("file", file);
    // formData.append("file", file);
    console.log(formData);
    console.log(typeof formData);
    try {
      const res = await fetch("/api/uploadfile", {
        method: "POST",
        body: formData,
        // body: "sent to the server",
      });
      //   console.log(res);
      if (!res.ok) {
        throw new Error("Failed to generate Q&A");
      } else {
        const data = await res.json();
        console.log(data);
      }
      //   set the flashcard here
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
      setShowSubmit(false);
    }
  };
  return (
    <>
      <div className="grid w-full items-center justify-center gap-1.5">
        {/* <Label htmlFor="picture">Upload A PDF File </Label> */}
        {error && <p className="text-red-500">{error}</p>}
        <Input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full h-32 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 text-center flex items-center justify-center cursor-pointer"
        />
      </div>
      {ShowSubmit && (
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-xl font-semibold mb-4">Ready to Submit?</h1>
          <p className="mb-4">
            {/* Submit the {file?.name} to generate questions and answers. */}
          </p>
          <div className="flex">
            <button
              type="button"
              className="mr-4 py-2 px-4 bg-gray-300 hover:bg-gray-400 rounded"
              // onClick={() => setShowSubmit(false)}
            >
              Cancel
            </button>
            <Button
              //   type="Button"
              //   className="py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 rounded"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Generating..." : "Submit"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
