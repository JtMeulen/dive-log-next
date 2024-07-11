"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthLinks() {
  const { status } = useSession();

  return (
    status === "unauthenticated" && (
      <div>
        <Link href="/login">Login</Link> or <Link href="/signup">Signup</Link>
      </div>
    )
  );
}
