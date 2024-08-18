"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { NotepadTextDashed, Menu, LucideLogOut } from "lucide-react";
import Logout from "./Logout";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Nav = () => {
    const { currentUser, isLoading, logout } = useAuth();

    return (
        <header className="flex flex-row w-full items-center justify-between px-12 py-4 shadow-md">
            <Link href="/" className="flex flex-row gap-2 items-center">
                <NotepadTextDashed
                    size={24}
                    strokeWidth={3}
                    className="font-bold text-primary"
                />
                <h1 className="text-2xl font-bold">CardGenAI</h1>
            </Link>
            <nav className="hidden items-center gap-8 space-x-4 sm:flex">
                {currentUser && (
                    <Link href="/flashcards" className="text-md font-semibold">
                        My Decks
                    </Link>
                )}

                {currentUser === null ? (
                    <Link href="/login">
                        <Button className="text-md">Get Started</Button>
                    </Link>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="bottom"
                            sideOffset={12}
                            align="end"
                            className="w-[200px]"
                        >
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logout}>
                                <LucideLogOut size={15} className="mr-2" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </nav>
            <div className="flex items-center sm:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Menu />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side="bottom"
                        sideOffset={12}
                        align="end"
                        className="w-[200px]"
                    >
                        <DropdownMenuLabel>Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {currentUser && (
                            <DropdownMenuItem>
                                <Link href="/flashcards">My Decks</Link>
                            </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            {currentUser === null ? (
                                <Link href="/login">
                                    <Button className="text-md">
                                        Get Started
                                    </Button>
                                </Link>
                            ) : (
                                <Logout />
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Nav;
