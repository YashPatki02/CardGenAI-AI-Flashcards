import { doc, getDocs, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";

//! this function gets the user data (name and email)
export const getUserById = async (userId) => {
  const userDocRef = doc(db, "Users", userId);
  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw new Error("Failed to get user");
  }
};

// ! getting flashcards
export const getFlashcardsByUserId = async (userId) => {
  const flashcardsColRef = collection(db, `Users/${userId}/Flashcards`);

  try {
    const snapshot = await getDocs(flashcardsColRef);
    // * if empty
    if (snapshot.empty) {
      return null;
    }
    let flashcards = [];
    snapshot.docs.forEach((doc) => {
      flashcards.push({ ...doc.data(), id: doc.id });
    });
    //* return
    return flashcards;
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    throw new Error("Failed to fetch flashcards");
  }
};

// ! setting
/* 
    flashcard will be 
    {
        title:string
        private:bool
        description :strong
        questions [{front, back}] // list of obj
    }
*/
export const addFlashcard = async (userId, flashcard) => {
  const flashcardsColRef = collection(db, `Users/${userId}/Flashcards`);
  try {
    const docRef = await addDoc(flashcardsColRef, flashcard);
    console.log("Flashcard added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding flashcard:", error);
    throw new Error("Failed to add flashcard");
  }
};
// ! getting Flashcard docID
export const getFlashcardByDocId = async (userId, docId) => {
  const flashcardDocRef = doc(db, `Users/${userId}/Flashcards/${docId}`);
  try {
    const docSnap = await getDoc(flashcardDocRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching flashcard:", error);
    throw new Error("Failed to fetch flashcard");
  }
};