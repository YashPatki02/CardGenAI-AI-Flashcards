"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, use } from "react";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { upgradeUser } from "@/lib/firebaseUtils";
import {Button} from "@/components/ui/button";

const ResultPage = () => {
    const searchParams = useSearchParams();
    const session_id = searchParams.get("session_id");
    const {currentUser, isLoading} = useAuth();

    const [loading, setLoading] = useState<boolean>(true);
    const [session, setSession] = useState<any | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) return;
            try {
                const res = await fetch(
                    `/api/checkout_sessions?session_id=${session_id}`
                );
                const sessionData = await res.json();
                if (res.ok) {
                    setSession(sessionData);
                } else {
                    setError(sessionData.error);
                }
            } catch (err) {
                setError("An error occurred while retrieving the session.");
            } finally {
                setLoading(false);
            }
        };
        fetchCheckoutSession();
    }, [session_id]);

    useEffect(() => {
        if (session) {
            console.log(session);

            if (session.payment_status === "paid") {
                try {
                    upgradeUser(currentUser.uid, {subscription: "Pro"});
                } catch (err) {
                    console.log("Error upgrading user");
                }
            }
        }
    }, [session]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen pb-20">
                <LoaderCircle size={48} className="animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen pb-20">
                <h2 className="text-2xl text-red-600">{error}</h2>
            </div>
        );
    }

    return (
        <section className="container flex justify-center items-start min-h-screen">
            <div className="p-8 border-2 mt-20 rounded-lg shadow-md max-w-lg w-full text-center">
                {session.payment_status === "paid" ? (
                    <div>
                        <h4 className="text-2xl font-semibold mb-4">
                            Thank you for your purchase!
                        </h4>
                        <div>
                            <p className="text-muted-foreground mt-2">
                                We have received your payment. You will receive
                                an email with the order details shortly.
                            </p>
                        </div>
                        <div className="mt-6">
                            <Button asChild>
                                <a href="/flashcards">Back to Flashcards</a>
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h4 className="text-2xl font-semibold mb-4">
                            Payment failed
                        </h4>
                        <div>
                            <p className="text-muted-foreground">
                                Your payment was not successful. Please try
                                again.
                            </p>
                        </div>
                        <div className="mt-6">
                            <Button asChild>
                                <a href="/flashcards">Back to Flashcards</a>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ResultPage;
