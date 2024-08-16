"use client";
import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
// import { login } from "../app/(home)/login/actions";
import { redirect } from "next/navigation";

const Login = () => {
    /* const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await login(email, password);
            console.log("Logged in successfully!");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }; */
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setError(null); // Reset error state

        // const result = await login(formData);
        // console.log("in handle submit");
        // if (!result.success) {
        //     setError(result.error as string);
        //     console.log("error has occur", result.error);
        // } else {
        //     // Redirect to dashboard on successful login
        //     console.log("successfully logged in ");
        //     redirect("/dashboard");
        // }
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
            {/* {error && <p className="text-red-500">{error}</p>} */}
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </Button>
            {/* <button formAction={login}>Submit</button> */}
        </form>
    );
};

export default Login;
