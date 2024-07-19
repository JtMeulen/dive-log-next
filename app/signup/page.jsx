"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { signupAction } from "@/lib/actions/signup";
import Loader from "@/components/Loader";

import { passwordPattern } from "@/utils/validation/patterns";

import styles from "./page.module.css";

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
      toast.error('Passwords do not match.');
      setLoading(false);
      return;
    }

    const response = await signupAction(formData);

    if (response?.error) {
      toast.error(response.error);
      setLoading(false);
    }

    if (response?.user) {
      formRef.current?.reset();
      toast.success("Welcome to ScubiBranches! 🎉");
      router.push("/login");
    }
  };

  return (
    <main className={styles.main}>
      <h1>Sign up</h1>

      {loading && <Loader />}

      <form
        onSubmit={handleSignup}
        ref={formRef}
        className={`${loading && styles.hide}`}
      >
        <Input type="text" name="name" label="Name" required />
        <Input type="email" name="email" label="Email" required />
        <Input
          type="password"
          name="password"
          label="Password"
          pattern={passwordPattern}
          required
        />
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

      <p className={`${styles.link} ${loading && styles.hide}`}>
        Already a member? <Link href="/login">Login</Link> instead.
      </p>
    </main>
  );
}
