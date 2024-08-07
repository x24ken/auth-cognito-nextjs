"use client";

import React from "react";
import { signInWithRedirect } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      await signInWithRedirect({ provider: "Google" });
      // 注意: この行は実行されない可能性が高いです。
      // signInWithRedirect は通常、リダイレクトを引き起こすため。
      // router.push("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin} className="google-login-button">
      Googleでログイン
    </button>
  );
}
