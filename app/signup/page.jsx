"use client";

import { useRef } from "react";

import styles from "./page.module.css";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function Signup() {
  // const passwordRef = useRef(null);

  const submitAction = async (formData) => {
    // TODO: move to file so we can use server actions
    // 'use server';

    // const response = await fetch('/api/signup', {
    //   method: 'POST',
    //   body: data,
    // });

    const userData = {};

    console.log(formData);
  };

  const verifyRepeatPassword = (e) => {
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
    </main>
  );
}
