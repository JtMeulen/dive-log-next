"use server";

import Image from "next/image";

import styles from "./page.module.css";
import avatarPlaceholder from "@/public/avatar_placeholder.png";
import { getUser } from "@/lib/actions/getUser";
import { updateUser } from "@/lib/actions/updateUser";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default async function EditProfilePage() {
  const user = await getUser();

  // TODO: use client and show loading state when updating user

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.avatar}>
          <Image
            src={user.avatar || avatarPlaceholder}
            alt="Avatar image"
            fill
          />
        </div>

        <form action={updateUser}>
          <Input
            type="text"
            defaultValue={user.name || ""}
            label="Name"
            name="name"
            required
          ></Input>
          <Input
            type="date"
            defaultValue={user.birthdate ? new Date(user.birthdate)?.toISOString()?.split('T')[0] : ""}
            label="Birthdate"
            name="birthdate"
          ></Input>

          <Button>Save</Button>
        </form>
      </div>
    </main>
  );
}
