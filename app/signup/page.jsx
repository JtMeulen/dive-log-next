import Link from "next/link";

import styles from "./page.module.css";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { signupAction } from "@/lib/actions/signup";

export default function SignupPage() {
  return (
    <main className={styles.main}>
      <h1>Sign up</h1>

      <form className={styles.form} action={signupAction}>
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
