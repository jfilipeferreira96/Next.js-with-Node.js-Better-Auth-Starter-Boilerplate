"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/contexts/AuthContext";
import Button from "@/components/ui/button/Button";

export default function Navbar() {
  const { user, signOut } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-200/50 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold">
            YourApp
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 rounded-md hover:bg-gray-100 transition"
          >
            <div className="space-y-1">
              <span
                className={`block h-0.5 w-6 bg-black transition-transform ${menuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
              />
              <span
                className={`block h-0.5 w-6 bg-black transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"
                  }`}
              />
              <span
                className={`block h-0.5 w-6 bg-black transition-transform ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
              />
            </div>
          </button>

          <div className="hidden sm:flex gap-4 items-center">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="primary" size="md">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" size="md" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <Button variant="primary" size="md">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" size="md">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="sm:hidden flex flex-col gap-2 pb-4 animate-slideDown">
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() =>
                  {
                    signOut();
                    setMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/signin" onClick={() => setMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
