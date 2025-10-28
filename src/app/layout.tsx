
import type { Metadata } from "next";
import "./globals.css";
import "./layout.css";
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
      <body className="layout-body">
        <Header />
        <main className="layout-main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
