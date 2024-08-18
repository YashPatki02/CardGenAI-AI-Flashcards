"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const ResultPage = () => {
    const searchParams = useSearchParams();
    const session_id = searchParams.get("session_id");

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

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <div>{error}</div>
            </div>
        );
    }

    return (
        <div>
            {session.payment_status === "paid" ? (
                <div>
                    <h4>Thank you for your purchase!</h4>
                    <div>
                        <h6>Session ID: {session_id}</h6>
                        <p>
                            We have received your payment. You will receive an
                            email with the order details shortly.
                        </p>
                    </div>{" "}
                    {/* Correctly closing the inner div */}
                </div>
            ) : (
                <div>
                    <h4>Payment failed</h4>
                    <div>
                        <p>
                            Your payment was not successful. Please try again.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultPage;
