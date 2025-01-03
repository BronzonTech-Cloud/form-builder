"use client";

import { useAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

const DashboardPage = () => {

    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return redirect("/login");
    }

    return (
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4 md:px-6 lg:px-10 py-12">
            <div className="flex flex-col items-center justify-center w-full text-center">
                <h1 className="text-lg lg:text-2xl font-semibold text-center">
                    Welcome {user?.email}!
                </h1>
                <p className="text-base text-muted-foreground mt-4">
                    Start creating and managing your forms using our form builder.
                </p>
            </div>
        </div>
    )
};

export default DashboardPage
