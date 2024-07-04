"use client";

import Link from "next/link";

import styles from "./page.module.css";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const submitAction = async (formData) => {
    // TODO: move to file so we can use server actions
    // 'use server';

    console.log(formData);
  };

  return (
    <main className={styles.main}>
      <h1>Login</h1>

      <form className={styles.form} action={submitAction}>
        <Input type="email" name="email" label="Email" />
        <Input type="password" name="password" label="Password" />
        <Button type="submit">Login</Button>
      </form>

      <p className={styles.link}>Not a member yet? <Link href="/signup">Sign up</Link> instead!</p>
    </main>
  );
}
