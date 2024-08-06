// app/dashboard/page.tsx
"use client";

import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { AuthDebugger } from "../components/AuthDebugger";
import { SignOutButton } from "../components/SignOutButton";

export default function DashboardPage() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <h1>Dashboard</h1>
          <p>Welcome, {user?.username}</p>
          <button onClick={signOut}>Sign out</button>

          {/* デバッグ情報を表示 */}
          <AuthDebugger />
          <SignOutButton />
        </div>
      )}
    </Authenticator>
  );
}
