"use client";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";
import avatarPlaceholder from "@/public/avatar_placeholder.png";
import Button from "@/components/ui/Button";

export default function ProfilePage() {
  const router = useRouter();
  const { data, status } = useSession();

  // Fetch user data using data.user.id
  console.log(data?.user);

  // User browser locale to get the date format from createdAt
  // const memberSince = new Date(data.user.createdAt).toLocaleDateString();

  const handleSignOut = (e) => {
    e.preventDefault();

    signOut();
    router.push("/login");
  };

  return (
    <main className={styles.main}>
      {status === "authenticated" && (
        <div className={styles.content}>
          <div className={styles.avatar}>
            <Image src={avatarPlaceholder} alt="Avatar image" fill />
          </div>

          <p>{data.user.name}</p>
          <p>{data.user.email}</p>
          {/* <p>Age: {data.user.birthdate}</p> */}
          {/* <p>Joined: {memberSince}</p> */}

          <div className={styles.actions}>
            <Button variant="primary">Edit Account</Button>
            <Button variant="secondary" onClick={handleSignOut}>
              Sign Out
            </Button>
            <Button variant="secondary">Delete Account</Button>
          </div>
        </div>
      )}
    </main>
  );
}
