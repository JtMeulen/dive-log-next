"use client";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

import styles from "./page.module.css";
import avatarPlaceholder from "@/public/avatar_placeholder.png";
import Button from "@/components/ui/Button";

export default function ProfilePage() {
  const { status, data } = useSession();

  // UseSession is only returning name and email, need more data
  console.log(data)

  // User browser locale to get the date format from createdAt
  // const memberSince = new Date(data.user.createdAt).toLocaleDateString();

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
            <Button variant="secondary" onClick={signOut}>
              Sign Out
            </Button>
            <Button variant="secondary">Delete Account</Button>
          </div>
        </div>
      )}
    </main>
  );
}
