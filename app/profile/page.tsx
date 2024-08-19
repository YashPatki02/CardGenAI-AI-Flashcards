"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { getUserById, registerUser } from "@/lib/firebaseUtils";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  //   const [profilePicture, setProfilePicture] = useState(null);
  //! checking for user
  const { isLoading, currentUser } = useAuth();
  useEffect(() => {
    const getData = async () => {
      // check if we have the data
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
  }, []);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "dob") {
      setDob(value);
    }
    // else if (name === "profilePicture") {
    //   setProfilePicture(files[0]);
    // }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Form submitted with:", {
      firstName,
      lastName,
      email,
      dob,
      //   profilePicture,
    });
    if (!firstName || !lastName || !email || !dob) {
      console.log("All fields are required.");
      return;
    }
    try {
      await registerUser(currentUser.uid, {
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        email: email,
      });
      console.log("saved data successfully");
    } catch (error) {
      console.log("error saving profile data", error);
    }
  };

  return (
    <Card className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Your User Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={dob}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
              min="1900-01-01"
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="mb-4">
            {/* <label className="block text-gray-700">Profile Picture</label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              accept="image/*"
            /> */}
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default Profile;
