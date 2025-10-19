import React from "react";
import { Metadata } from "next";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Next.js SignUp Page | Next.js Dashboard Template",
  description: "This is Next.js SignUp Page Dashboard Template",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}

