// components/AuthDebugger.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  fetchAuthSession,
  getCurrentUser,
  fetchUserAttributes,
} from "aws-amplify/auth";

async function debugAuthState() {
  try {
    console.log("Fetching auth session...");
    const session = await fetchAuthSession();
    console.log("Auth session fetched:", session);

    console.log("Getting current user...");
    const currentUser = await getCurrentUser();
    console.log("Current user fetched:", currentUser);

    console.log("Fetching user attributes...");
    const attributes = await fetchUserAttributes();
    console.log("User attributes fetched:", attributes);

    return { session, currentUser, attributes };
  } catch (error) {
    console.error("Error in debugAuthState:", error);
    // エラーの詳細情報を返す
    return { error: error, errorDetails: error };
  }
}

export function AuthDebugger() {
  const [authState, setAuthState] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    debugAuthState()
      .then((result) => {
        if (result.error) {
          setError(result.error.toString());
        } else {
          setAuthState(result);
        }
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>Loading auth state...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!authState) return <div>No auth state available</div>;

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "5px",
        marginTop: "20px",
        overflowX: "auto",
      }}
    >
      <h2>Auth Debug Information</h2>
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
        {JSON.stringify(authState, null, 2)}
      </pre>
    </div>
  );
}
