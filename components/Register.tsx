// import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


const Register = () => {
    /* const { register } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await register(email, password);
            console.log("Registered successfully!");
        } catch (error) {
            setError(error.message);
            setLoading(false);
            return;
        } */
    // };
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
            // const result = await signup(formData);

            // if (result.success) {
            //     router.push("/dashboard"); // Redirect to the dashboard on successful registration
            // } else {
            //     setError(result.error as string); // Set error message if registration fails
            // }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        // <form className="space-y-4">
        <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
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
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
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
                    // value={password}
                    // onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {/* <Button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </Button> */}
            <Button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </Button>
            {/* <button formAction={signup}>Register</button> */}
        </form>
    );
};

export default Register;
