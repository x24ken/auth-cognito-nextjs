"use client";

import React from "react";
import Link from "next/link";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Navigation() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <nav>
      <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
        <li style={{ margin: "0 10px" }}>
          <Link href="/">ホーム</Link>
        </li>
        {user ? (
          <>
            <li style={{ margin: "0 10px" }}>
              <Link href="/dashboard">ダッシュボード</Link>
            </li>
            <li style={{ margin: "0 10px" }}>
              <button onClick={signOut}>サインアウト</button>
            </li>
          </>
        ) : (
          <li style={{ margin: "0 10px" }}>
            <Link href="/auth">サインイン</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
