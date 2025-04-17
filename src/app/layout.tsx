import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arthur Verdadeiro - Portfólio",
  description: "Portfólio de Arthur Verdadeiro, estudante e desenvolvedor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased font-primary">
        {children}
      </body>
    </html>
  );
}
