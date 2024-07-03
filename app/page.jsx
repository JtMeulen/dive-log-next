import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";
import LogoImg from "@/public/logo.png";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <h1>Welcome to ScubApp</h1>
      <p>Your favorite scuba dive log!</p>

      <Image src={LogoImg} alt="ScubApp logo" />

      <div>
        <Link href="/login">Login</Link> or <Link href="/signup">Signup</Link>
      </div>
    </main>
  );
}
