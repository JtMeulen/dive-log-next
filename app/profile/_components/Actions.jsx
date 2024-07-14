"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { deleteUser } from "@/lib/actions/deleteUser";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import styles from "./page.module.css";

export default function Actions() {
  const router = useRouter();

  const handleSignOut = (e) => {
    e.preventDefault();

    signOut();
    router.push("/login");
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    
    const response = await deleteUser();

    if (response.success) {
      signOut();
      router.push("/");
    } else {
      console.log(response.error);
    }
  }

  return (
    <div className={styles.actions}>
      <ButtonLink variant="primary" href="/profile/edit">
        Edit Account
      </ButtonLink>
      <Button variant="secondary" onClick={handleSignOut}>
        Sign Out
      </Button>
      <Button variant="secondary" onClick={handleDelete}>
        Delete Account
      </Button>
    </div>
  );
}
