"use client";
import Image from "next/image";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import HeroColumns from "@/components/HeroColumns";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import PublicPage from "@/components/PublicPage";

export default function Home() {
    const { currentUser, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <LoaderCircle size={48} className="animate-spin text-primary" />
            </div>
        );
    } else {
        return (
            <>
                {currentUser && (
                    <PublicPage />
                )}
                {!currentUser && (
                    <div className="flex flex-col items-center justify-start min-h-screen">
                        <Hero />
                        <Pricing />
                        <Testimonials />
                        <FAQ />
                        <CTA />
                    </div>
                )}
            </>
        );
    }
}
