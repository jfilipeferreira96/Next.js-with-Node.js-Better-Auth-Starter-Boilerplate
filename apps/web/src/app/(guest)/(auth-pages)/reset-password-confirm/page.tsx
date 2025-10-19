import ResetPasswordConfirmForm from "@/components/auth/ResetPasswordConfirmForm";
import { Metadata } from "next";
import React, { useState, useEffect } from "react";

export const metadata: Metadata = {
  title: "Next.js Reset Password Confirmation | Next.js Dashboard Template",
  description:
    "This is Next.js Password Reset page for Dashboard Template",
  // other metadata
};

export default function ResetPasswordConfirmPage() {
  return <ResetPasswordConfirmForm />;
}
