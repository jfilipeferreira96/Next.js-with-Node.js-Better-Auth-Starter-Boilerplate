"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/AuthContext";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/signin");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || (!isAuthenticated && user === null)) {
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600"></div>
      </div>
    </div>;
  }

  if (!isAuthenticated) return null;

  return <div>{children}</div>;
}
