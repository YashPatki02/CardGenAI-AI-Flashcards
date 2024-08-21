"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { auth, db } from "@/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// firestore function
import { doc, getDoc } from "firebase/firestore";
import { registerUser } from "@/lib/firebaseUtils";

interface AuthContextProps {
  currentUser: any;
  isLoading: boolean;
  signup: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

// work as a wraper
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // storing current user
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [isLoading, setLoading] = useState(true);

  async function signup(email: string, password: string) {
    // return createUserWithEmailAndPassword(auth, email, password);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("userid", user.uid);
      try {
        // adding user to database
        const data = {
          email: email,
          firstName: "",
          lastName: "",
          dob: "",
          subscription: "Free",
        };
        await registerUser(user.uid, data);
        setCurrentUser(user);
        console.log("register the user");
      } catch (err) {
        console.log("unable to add user to the db");
      }

      // Update current user state
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }

  //   Login with email and password
  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoading, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthUserProvider");
  }
  return context;
};
