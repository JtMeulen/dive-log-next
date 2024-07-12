"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

import Input from "@/components/Input";
import Button from "@/components/Button";
import Loader from "@/components/Loader";

export default function LoginPage() {
  const router = useRouter();
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      console.log("Error:", res.error);
      setLoading(false);
    }

    if (res?.ok) {
      formRef.current?.reset();
      router.push("/dives");
    }
  };

  return (
    <main className={styles.main}>
      <h1>Login</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
            <Input type="email" name="email" label="Email" required />
            <Input type="password" name="password" label="Password" required />
            <Button type="submit">Login</Button>
          </form>

          <p className={styles.link}>
            Not a member yet? <Link href="/signup">Sign up</Link> instead!
          </p>
        </>
      )}
    </main>
  );
}
