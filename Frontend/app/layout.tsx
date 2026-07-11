"use client";
import "./globals.css";
import { Sidebar } from "./components/Sidebar";
import { Inter, Poppins, Space_Mono, Ultra } from "next/font/google";
import { buscarUsuario } from "./services/api";
import { useEffect, useState } from "react";
import { user } from "@/types/User";
import { Metadata } from "./components/Metadata";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});
export const ultra = Ultra({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ultra",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [usuario, setUsuario] = useState<user | null>(null);

  useEffect(() => {
    async function carregarUsuario() {
      const dados = await buscarUsuario();
      setUsuario(dados);
    }

    carregarUsuario();
  }, []);
  return (
    <html lang="pt-br" className="h-full antialiased" cz-shortcut-listen="true">
      <body
        className={`h-screen flex bg-[#0E1015]  flex-row ${spaceMono.variable} * ${ultra.variable} * ${poppins.variable} * ${inter.variable} `}
        cz-shortcut-listen="true"
      >
        <Metadata />
        {usuario && <Sidebar />}
        {children}
      </body>
    </html>
  );
}
