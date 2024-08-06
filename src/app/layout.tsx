"use client";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Inter } from "next/font/google";
import Navigation from "./components/Navigation";
import { getUserDisplayName } from "@/utils/auth";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// Amplify の設定
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
      userPoolClientId: process.env
        .NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID as string,
      loginWith: {
        oauth: {
          domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN as string,
          scopes: [
            "email",
            "profile",
            "openid",
            "aws.cognito.signin.user.admin",
          ],
          redirectSignIn: [process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN as string],
          redirectSignOut: [
            process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT as string,
          ],
          responseType: "code",
        },
      },
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [displayName, setDisplayName] = useState("User");

  useEffect(() => {
    async function fetchDisplayName() {
      const name = await getUserDisplayName();
      setDisplayName(name);
    }
    fetchDisplayName();
  }, []);

  return (
    <html lang="ja">
      <body className={inter.className}>
        <Authenticator socialProviders={["google"]}>
          {({}) => (
            <main>
              <Navigation />
              <h1>Hello {displayName}</h1>
              {children}
            </main>
          )}
        </Authenticator>
      </body>
    </html>
  );
}
