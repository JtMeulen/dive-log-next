import Image from "next/image";

import LogoImg from "@/public/logo.png";
import Links from "./_components/Links";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <h1>Welcome to ScubiBranches</h1>
      <p>Your favorite nudibranch dive log!</p>

      <Image src={LogoImg} alt="ScubiBranches logo" />

      <Links />
    </main>
  );
}
