// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { ClearStorageOnReload } from "@/components/ClearStorageOnReload";
import LayoutClientWrapper from "@/components/LayoutClientWrapper";

export const metadata: Metadata = {
  title: "GoodTicket",
  description: "Plataforma de Eventos",
  keywords: ["aluguel", "imoveis", "venda", "visita", "Pelotas"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <ClearStorageOnReload />
        <LayoutClientWrapper>{children}</LayoutClientWrapper>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
