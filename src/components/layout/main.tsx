"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { usePathname } from "next/navigation";

export function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentRoute = usePathname();
  const pathname = currentRoute.split("/")[1];

  const noNav = ["signup", "login", "dashboard"];
  const noFooter = ["signup", "login", "dashboard"];

  return (
    <>
      {!noNav.includes(pathname) && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!noFooter.includes(pathname) && <Footer />}
    </>
  );
}
