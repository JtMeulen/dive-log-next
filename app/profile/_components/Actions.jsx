"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import styles from "./page.module.css";
import ButtonLink from "@/components/ButtonLink";

export default function Actions() {
  const router = useRouter();

  const handleSignOut = (e) => {
    e.preventDefault();

    signOut();
    router.push("/login");
  };

  return (
    <div className={styles.actions}>
      <ButtonLink variant="primary" href="/profile/edit">Edit Account</ButtonLink>
      <Button variant="secondary" onClick={handleSignOut}>
        Sign Out
      </Button>
      <Button variant="secondary">Delete Account</Button>
    </div>
  );
}
