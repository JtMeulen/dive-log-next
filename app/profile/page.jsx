import Image from "next/image";

import styles from "./page.module.css";
import avatarPlaceholder from "@/public/avatar_placeholder.png";
import Button from "@/components/ui/Button";

export default function ProfilePage() {
  // TODO: fetch real user data
  const user = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    age: "25",
    avatar: "",
    created_at: "2021-09-21T00:00:00Z",
  };

  // User browser locale to get the date format from created_at
  const memberSince = new Date(user.created_at).toLocaleDateString();

  return (
    <main className={styles.main}>
      {/* TODO: probably move this inside /profile/components folder so we can use client inside use server */}
      <div className={styles.content}>
        <div className={styles.avatar}>
          <Image src={avatarPlaceholder} alt="Avatar image" fill />
        </div>

        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>Age: {user.age}</p>
        <p>Joined: {memberSince}</p>

        <div className={styles.actions}>
          <Button variant="primary">Edit Account</Button>
          <Button variant="secondary">Delete Account</Button>
        </div>
      </div>
    </main>
  );
}
