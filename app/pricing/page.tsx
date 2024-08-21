"use client";
import React, { useEffect } from "react";
import Pricing from "@/components/Pricing";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

const PricingPage = () => {
    const { currentUser, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !currentUser) {
            redirect("/login");
        }
    }, [currentUser, isLoading]);


    return (
        <section className="container flex flex-col items-start gap-8 px-8 md:px-20 sm:gap-10 min-h-screen">
            <Pricing hidden={true} />
        </section>
    );
};

export default PricingPage;
