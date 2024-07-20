"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { signupAction } from "@/lib/actions/signup";
import Loader from "@/components/Loader";

import { passwordPattern, emailPattern } from "@/utils/validation/patterns";

import styles from "./page.module.css";
import Divider from "@/components/Divider";

export default function SignupPage() {
  const { status } = useSession();
  const formRef = useRef();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pwNotMatching, setPwNotMatching] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dives");
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status, router]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    if (formData.get("password") !== formData.get("password-repeat")) {
      setPwNotMatching(true);
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    const response = await signupAction(formData);

    if (response?.error) {
      toast.error(response.error);
      setLoading(false);
    }

    if (response?.user) {
      await signIn("credentials", {
        email: response.user.email,
        password: formData.get("password"),
        redirect: false,
      });

      toast.success("Welcome to ScubiBranches! 🎉");
      formRef.current?.reset();
      router.push("/dives");
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
        <Input
          type="email"
          name="email"
          label="Email"
          pattern={emailPattern}
          required
        />
        <Input
          type="password"
          name="password"
          label="Password"
          pattern={passwordPattern}
          description="Min 8 chars: 1 uppercase, 1 lowercase, 1 number, 1 special character."
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

        <Divider>or</Divider>

        <Button
          type="button"
          onClick={() => {
            setLoading(true);
            signIn("google", { callbackUrl: "/dives" });
          }}
          variant="google"
        >
          Sign up with Google
        </Button>
      </form>

      <p className={`${styles.link} ${loading && styles.hide}`}>
        Already a member? <Link href="/login">Login</Link> instead.
      </p>
    </main>
  );
}
