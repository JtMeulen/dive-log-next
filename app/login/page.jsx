"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Input from "@/components/Input";
import Button from "@/components/Button";
import Loader from "@/components/Loader";

import styles from "./page.module.css";
import Divider from "@/components/Divider";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const formRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dives");
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email").toLowerCase(),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
    }

    if (res?.ok) {
      formRef.current?.reset();
      toast.success("Welcome back! 👋");
      router.push("/dives");
    }
  };

  return (
    <main className={styles.main}>
      <h1>Login</h1>
      {loading && <Loader />}
      <>
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className={`${loading && styles.hide}`}
        >
          <Input type="email" name="email" label="Email" required />
          <Input type="password" name="password" label="Password" required />
          <Button type="submit">Login</Button>

          <Divider>or</Divider>

          <Button
            type="button"
            onClick={() => {
              setLoading(true);
              signIn("google", { callbackUrl: "/dives" });
            }}
            variant="google"
          >
            Sign in with Google
          </Button>
        </form>

        <p className={`${styles.link} ${loading && styles.hide}`}>
          Not a member yet? <Link href="/signup">Sign up</Link> instead!
        </p>
      </>
    </main>
  );
}
