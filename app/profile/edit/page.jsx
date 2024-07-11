"use server";

import Image from "next/image";

import styles from "./page.module.css";
import avatarPlaceholder from "@/public/avatar_placeholder.png";
import { getUser } from "@/lib/actions/getUser";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default async function EditProfilePage() {
  const user = await getUser();

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.avatar}>
          <Image src={avatarPlaceholder} alt="Avatar image" fill />
        </div>
        <form>
          <Input type="text" value={user.name} label="Name" required></Input>
          <Input type="date" value={user.email} label="Date of birth"></Input>

          <p>{user.email}</p>
          <Button>Save</Button>
        </form>
      </div>
    </main>
  );
}
