"use server";

import Image from "next/image";

import styles from "./page.module.css";
import avatarPlaceholder from "@/public/avatar_placeholder.png";
import Actions from "./_components/Actions";
import { getUser } from "@/lib/actions/getUser";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getUser();

  if (user.error) {
    return redirect("/");
  }

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.avatar}>
          <Image src={user.avatar || avatarPlaceholder} alt="Avatar image" fill />
        </div>

        <p>{user.name}</p>
        <p className={styles.email}>{user.email}</p>
        {user.birthdate && (
          <p>Date of birth: {new Date(user.birthdate).toLocaleDateString()}</p>
        )}

        <Actions />
      </div>
    </main>
  );
}
