"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { signupAction } from "@/lib/actions/signup";

export default function SignupPage() {
  const formRef = useRef();
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const response = await signupAction(formData);

    if (response?.error) {
      // TODO: Show error message to user
      console.log(response.error);
    }

    if (response?.user) {
      formRef.current?.reset();
      router.push("/login");
    }
  };

  return (
    <main className={styles.main}>
      <h1>Sign up</h1>

      <form className={styles.form} onSubmit={handleSignup} ref={formRef}>
        <Input type="text" name="name" label="Name" required />
        <Input type="email" name="email" label="Email" required />
        <Input type="password" name="password" label="Password" required />
        {/* <Input
          type="password"
          name="password-repeat"
          label="Password repeat"
          onPaste={(e) => e.preventDefault()}
          onBlur={verifyRepeatPassword}
          required
        /> */}

        <Button type="submit">Sign up</Button>
      </form>

      <p className={styles.link}>
        Already a member? <Link href="/login">Login</Link> instead.
      </p>
    </main>
  );
}
