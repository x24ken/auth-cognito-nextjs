"use client";

import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  return (
    <Authenticator>
      {({ user }) => {
        if (user) {
          router.push("/dashboard"); // ユーザーが認証されたらダッシュボードにリダイレクト
          return <></>; // 空の Fragment を返す
        }
        return (
          <div>
            <h1>認証ページ</h1>
            <p>サインインまたはサインアップしてください。</p>
          </div>
        );
      }}
    </Authenticator>
  );
}
