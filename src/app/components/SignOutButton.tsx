"use client";

import React from "react";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("Successfully signed out");
      // サインアウト後にホームページやログインページにリダイレクトする
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}
