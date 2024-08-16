import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
const inter = Inter({ subsets: ["latin"] });
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "CardGen AI",
    description: "AI-powered Flashcards for Students",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <Nav />
                    {children}
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
