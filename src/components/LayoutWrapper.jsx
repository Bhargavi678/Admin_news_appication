"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import BottomNav from "@/components/BottomNav";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register";

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white relative">
      {!isAuthPage && <Header />}

      <main className={!isAuthPage ? "pb-24 pt-36" : ""}>
        {children}
      </main>

      {!isAuthPage && <BottomNav />}
    </div>
  );
}