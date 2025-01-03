"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";

const PROTECTED_ROUTES = ["/forms(.*)", "/dashboard"];

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isAuthenticated === null) return;

        const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
            pathname?.startsWith(route.replace("[id]", ""))
        );

        if (!isAuthenticated && isProtectedRoute) {
            router.push("/login");
        }
    }, [isAuthenticated, pathname, router]);

    return <>{children}</>;
};

export default AuthProvider;
