"use client";

import Link from "next/link";

import styles from "./page.module.css";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { loginAction } from "@/lib/actions/login";

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <h1>Login</h1>

      <form className={styles.form} action={loginAction}>
        <Input type="email" name="email" label="Email" required />
        <Input type="password" name="password" label="Password" required />
        <Button type="submit">Login</Button>
      </form>

      <p className={styles.link}>
        Not a member yet? <Link href="/signup">Sign up</Link> instead!
      </p>
    </main>
  );
}
