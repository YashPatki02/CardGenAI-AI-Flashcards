"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Logout = () => {
    const { logout } = useAuth();

    return (
        <Button onClick={logout} variant="secondary" className="text-md font-semibold">
            Logout
        </Button>
    );
};

export default Logout;
