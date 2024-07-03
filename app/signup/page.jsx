"use client";

import { useRef } from "react";
import Link from "next/link";

import styles from "./page.module.css";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SignupPage() {
  // const passwordRef = useRef(null);

  const submitAction = async (formData) => {
    // TODO: move to file so we can use server actions
    // 'use server';

    console.log(formData);
  };

  const verifyRepeatPassword = (e) => {
    // TODO: verify passwords match
    console.log(e.target.value)
    // if (e.target.value !== passwordRef?.current.value) {
    //   console.log("Passwords do not match!");
    // }
  };

  return (
    <main className={styles.main}>
      <h1>Sign up</h1>

      <form className={styles.form} action={submitAction}>
        <Input type="text" name="name" label="Name" />
        <Input type="email" name="email" label="Email" />
        <Input type="password" name="password" label="Password" />
        <Input
          type="password"
          name="password-repeat"
          label="Password repeat"
          onPaste={(e) => e.preventDefault()}
          onBlur={verifyRepeatPassword}
        />

        <Button type="submit">Sign up</Button>
      </form>

      <p>Already a member? <Link href="/login">Login</Link> instead.</p>
    </main>
  );
}
