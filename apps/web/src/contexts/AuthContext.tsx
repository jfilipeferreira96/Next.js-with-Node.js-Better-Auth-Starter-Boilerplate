"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export interface User {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
  emailVerified?: boolean;
}

interface SessionResponse {
  data: {
    session: Record<string, unknown> | null;
    user: User | null;
  } | null;
  error: {
    code?: string;
    message?: string;
    status?: number;
    statusText?: string;
  } | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkSession = async () => {
    setIsLoading(true);
    try {
      const data: SessionResponse = await authClient.getSession();

      const user = data?.data?.user;
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const signOut = async () => {
    try {
      setUser(null);

      await authClient.signOut();

      router.replace("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };


  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signOut,
    checkSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context;
}
