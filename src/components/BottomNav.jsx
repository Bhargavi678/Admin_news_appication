"use client";

import Link from "next/link";
import { Home, Grid2X2, User, MapPin, SquarePlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function BottomNav() {
  const pathname = usePathname();

  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const navItems = [
    {
      name: "Home",
      href: "/home",
      icon: Home,
    },
    {
      name: "Categories",
      href: "/categories",
      icon: Grid2X2,
    },

    ...(role === "admin"
      ? [
          {
            name: "Post",
            href: "/post",
            icon: SquarePlus,
          },
        ]
      : []),

    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
    
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200">
      <div className="flex justify-around py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center gap-1"
            >
              <div
                className={`p-3 rounded-full ${
                  active
                    ? "bg-orange-500 text-white"
                    : "text-gray-500"
                }`}
              >
                <Icon size={22} />
              </div>

              <span
                className={`text-xs ${
                  active
                    ? "text-orange-500"
                    : "text-gray-500"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}