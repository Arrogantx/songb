"use client";

import { CardDescription, CardTitle } from "@/components/ui/card";

export function AuthHeader() {
  return (
    <>
      <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
      <CardDescription className="text-gray-400">
        Sign in to your account to access all features
      </CardDescription>
    </>
  );
}