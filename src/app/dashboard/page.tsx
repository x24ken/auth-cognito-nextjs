// app/dashboard/page.tsx
"use client";

import React from "react";
import { AuthDebugger } from "../components/AuthDebugger";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* デバッグ情報を表示 */}
      <AuthDebugger />
    </div>
  );
}
