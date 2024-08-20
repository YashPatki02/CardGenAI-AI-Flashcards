import {
  doc,
  getDocs,
  getDoc,
  addDoc,
  collection,
  deleteDoc,
  query,
  where,
  setDoc,
} from "firebase/firestore";
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
      return [];
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
export const getRecentFlashcards = async (userId) => {
  const flashcardsColRef = collection(db, `Users/${userId}/Flashcards`);

  try {
    const snapshot = await getDocs(flashcardsColRef);
    // * if empty
    if (snapshot.empty) {
      return [];
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
// ! register page to add user
export const registerUser = async (userId, data) => {
  try {
    await setDoc(doc(db, "Users", userId), data);
    console.log("User added to Firestore");
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
};
// !deleteFlashcard
export const deleteFlashcard = async (userId, docId) => {
  try {
    await deleteDoc(doc(db, `Users/${userId}/Flashcards`, docId));
    return { success: true };
  } catch (error) {
    console.log("Error deleting document");
    console.log(err);
    return { success: false, error: err };
  }
};
// getting public flashcards from users
export const getFlashcardsForAllUsers = async (currentUid) => {
  try {
    // getting all the user docs
    const usersSnapshot = await getDocs(collection(db, 'Users'));
    const userDocs = usersSnapshot.docs;
    const userIds = userDocs.map(doc => doc.id);
    // obj for user Names
    const userNames = {};

    // looping through individual userId
    for (const userId of userIds) {
      const userDoc = doc(db, 'Users', userId);
      const userSnapshot = await getDoc(userDoc);
      const userData = userSnapshot.data();
      // if we ge the userData the storing into the obj
      if (userData) {
        const firstName = userData.firstName || 'Unknown';
        const lastName = userData.lastName || 'User';
        userNames[userId] = `${firstName} ${lastName}`;
      }
    }

    const flashcards = [];

    //
    for (const userId of userIds) {
      const flashcardsCollection = collection(db, 'Users', userId, 'Flashcards');
      const q = query(flashcardsCollection, where('private', '==', false));

      try {
        const flashcardsSnapshot = await getDocs(q);

        flashcardsSnapshot.forEach(doc => {
          const flashcardData = doc.data();
          flashcards.push({
            id: doc.id,
            ...flashcardData,
            userName: userNames[userId]  // Add the user's name to the flashcard data
          });
        });

      } catch (err) {
        console.error(`Error fetching flashcards for user ${userId}:`, err);
      }
    }

    return flashcards;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};