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

      <Link href="/auth">Login or Register</Link>
    </main>
  );
}
