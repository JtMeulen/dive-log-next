"use server";

import { getUser } from "@/lib/actions/getUser";
import { updateUser } from "@/lib/actions/updateUser";

import Input from "@/components/Input";
import Button from "@/components/Button";
import ImagePicker from "@/components/ImagePicker";
import InputDatePicker from "@/components/InputDatePicker";

import avatarPlaceholder from "@/public/avatar_placeholder.png";

import styles from "./page.module.css";

export default async function EditProfilePage() {
  const user = await getUser();

  // TODO: use client and show loading state when updating user

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Edit your profile details!</h1>
      <div className={styles.content}>
        <form action={updateUser}>
          <ImagePicker
            name="avatar"
            label="Change Avatar"
            defaultImage={user.avatar || avatarPlaceholder}
          />
          <Input
            type="text"
            defaultValue={user.name || ""}
            label="Name"
            name="name"
            required
          ></Input>
          <InputDatePicker
            label="Birthdate"
            name="birthdate"
            defaultValue={user.birthdate}
            maxDate={new Date()}
          />

          <Button>Save</Button>
        </form>
      </div>
    </main>
  );
}
