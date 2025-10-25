import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Feedback de Produtos",
  description: "Feedback de Produtos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`antialiased min-w-full min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 container mx-auto p-4`}
      >
        <Header />
        <main className="flex-1 flex flex-col ">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
