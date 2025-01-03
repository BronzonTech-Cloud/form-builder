"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {

    const router = useRouter();

    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <header className="border-b h-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href={isAuthenticated ? "/dashboard" : "/"} className="text-xl font-bold">
                            Form Builder
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link href="/forms">
                                    <Button size="sm">
                                        Forms
                                    </Button>
                                </Link>
                                <Button size="sm" variant="outline" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button size="sm">
                                        Login
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
