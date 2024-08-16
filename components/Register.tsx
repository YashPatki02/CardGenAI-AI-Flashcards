"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
    const { signup } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            await signup(email, password);
            router.push("/flashcards");
        } catch (err: any) {
            setError(
                err.message || "An unexpected error occurred. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                />
            </div>
            <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                />
            </div>
            <div className="space-y-1">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                    id="confirm-password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </Button>
        </form>
    );
};

export default Register;
