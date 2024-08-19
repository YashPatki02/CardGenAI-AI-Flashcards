import { useAuth } from "@/context/AuthContext";
import { getFlashcardsForAllUsers } from "@/lib/firebaseUtils";
import { error } from "console";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

const PublicPage = () => {
  const { currentUser, isLoading } = useAuth();
  const [publicFlashcard, setPublicFlashcard] = useState();
  useEffect(() => {
    async function getPublicFlashcard() {
      try {
        const data:any = await getFlashcardsForAllUsers();
        if(data!==[]){
          setPublicFlashcard(data)
          console.log("successfully added")
          console.log(data)
        }
        else{
          throw Error("data is empty")
        }
      } catch (error) {
        console.log("unable to get data")
        console.log(error)
      }
    }
    getPublicFlashcard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pb-20">
        <LoaderCircle size={48} className="animate-spin text-primary" />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen">
        Public Home Page
      </div>
    );
  }
};

export default PublicPage;
