"use client";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await login(email, password);
            console.log("Logged in successfully!");
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData: FormData) => {
        setError(null); // Reset error state

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await login(email, password);
            redirect("/flashcards");
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        // <form  className="space-y-4">
        <form action={handleSubmit} className="space-y-4">
            <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
            </div>
            {/* {error && <p className="text-red-500">{error}</p>} */}
            {error && <p className="text-red-500">{error}</p>}
            <Button disabled={loading} onClick={handleLogin}>
                {loading ? "Logging in..." : "Login"}
            </Button>
            
        </form>
    );
};

export default Login;
