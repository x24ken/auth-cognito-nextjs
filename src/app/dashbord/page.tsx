"use client";

import React, { useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>ダッシュボード</h1>
      <p>ようこそ、{user.userId}さん！</p>
      <button onClick={signOut}>サインアウト</button>
    </div>
  );
}
