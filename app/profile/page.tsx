"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { getUserById, registerUser } from "@/lib/firebaseUtils";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";

export const Profile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [error, setError] = useState("");

    const { isLoading, currentUser } = useAuth();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getUserById(currentUser.uid);
                console.log(data);
                setFirstName(data?.firstName || "");
                setLastName(data?.lastName || "");
                setEmail(data?.email || "");
                setDob(data?.dob || "");
            } catch (err) {
                console.log(err);
            }
        };
        if (isLoading && !currentUser) {
            console.log("no current users");
            return redirect("/login");
        }
        getData();
    }, [currentUser, isLoading]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "firstName") {
            setFirstName(value);
        } else if (name === "lastName") {
            setLastName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "dob") {
            setDob(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted with:", {
            firstName,
            lastName,
            email,
            dob,
        });
        if (!firstName || !lastName || !email || !dob) {
            console.log("All fields are required.");
            setError("All fields are required.")
            return;
        }
        try {
            await registerUser(currentUser.uid, {
                firstName,
                lastName,
                email,
                dob,
            });
            alert("Data Saved Successfully")
            setError("")
            console.log("Saved data successfully");
        } catch (error) {
            console.log("Error saving profile data", error);
            setError("Error saving data")
        }
    };
        if (isLoading) {
          return (
            <div className="flex justify-center items-center h-screen">
              <LoaderCircle
                className="text-primary animate-spin mb-20"
                size={48}
              />
            </div>
          );
        }
    return (
        <div className="flex justify-center items-center h-screen mb-20">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Update Your User Profile</CardTitle>
                    <CardDescription>
                        Fill out the form below to create your profile.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={handleChange}
                                    className="mt-2"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    onChange={handleChange}
                                    className="mt-2"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    className="mt-2"
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="dob">Date of Birth</Label>
                                <Input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    value={dob}
                                    onChange={handleChange}
                                    className="mt-2"
                                    required
                                    min="1900-01-01"
                                    max={new Date().toISOString().split("T")[0]}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full"
                    >
                        Submit
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Profile;
