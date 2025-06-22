// src/components/LayoutClientWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

export default function LayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const esconderLayout = pathname === "/login" || pathname === "/cadastro";

  return (
    <>
      {!esconderLayout && <Header />}
      {children}
      {!esconderLayout && <Footer />}
    </>
  );
}
