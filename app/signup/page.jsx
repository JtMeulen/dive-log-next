"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { signupAction } from "@/lib/actions/signup";
import Loader from "@/components/Loader";

export default function SignupPage() {
  const formRef = useRef();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pwNotMatching, setPwNotMatching] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    if (formData.get("password") !== formData.get("password-repeat")) {
      setPwNotMatching(true);
      setLoading(false);
      return;
    }

    const response = await signupAction(formData);

    if (response?.error) {
      // TODO: Show error message to user by means of toast
      console.log(response.error);
      setLoading(false);
    }

    if (response?.user) {
      formRef.current?.reset();
      // TODO: Signin automatically here too using signIn from next-auth?
      router.push("/login");
    }
  };

  return (
    <main className={styles.main}>
      <h1>Sign up</h1>

      {loading ? (
        <Loader />
      ) : (
        <>
          <form onSubmit={handleSignup} ref={formRef}>
            <Input type="text" name="name" label="Name" required />
            <Input type="email" name="email" label="Email" required />
            <Input type="password" name="password" label="Password" required />
            <Input
              type="password"
              name="password-repeat"
              label="Password repeat"
              onPaste={(e) => e.preventDefault()}
              onFocus={() => setPwNotMatching(false)}
              errorMessage={pwNotMatching && "Passwords do not match."}
              required
            />

            <Button type="submit">Sign up</Button>
          </form>

          <p className={styles.link}>
            Already a member? <Link href="/login">Login</Link> instead.
          </p>
        </>
      )}
    </main>
  );
}
