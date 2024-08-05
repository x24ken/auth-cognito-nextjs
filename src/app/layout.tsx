"use client";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Inter } from "next/font/google";
import Navigation from "./components/Navigation";

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
          scopes: ["email", "profile", "openid"],
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
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Authenticator socialProviders={["google"]}>
          {({ signOut, user }) => (
            <main>
              <Navigation />
              <h1>Hello {user?.username}</h1>
              <button onClick={signOut}>Sign out</button>
              {children}
            </main>
          )}
        </Authenticator>
      </body>
    </html>
  );
}
