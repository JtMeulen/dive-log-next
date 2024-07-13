"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Links() {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return (
      <div>
        <Link href="/login">Login</Link> or <Link href="/signup">Signup</Link>
      </div>
    );
  } else if (status === "authenticated") {
    return (
      <p>
        <Link href="/dives/new">Log a new dive!</Link>
      </p>
    );
  }
}
