import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/components/auth-provider";
import Navbar from "@/components/navbar";

const base = Inter({
  subsets: ["latin"],
  variable: "--font-base",
});

export const metadata: Metadata = {
  title: "Form Builder",
  description: "Create and manage forms with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased",
          base.variable,
        )}
      >
        <AuthProvider>
          <Toaster richColors position="bottom-center" theme="light" />
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
