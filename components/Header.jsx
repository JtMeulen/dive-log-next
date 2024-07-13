"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

import styles from "./Header.module.css";
import NavLink from "@/components/NavLink";
import LogoImg from "@/public/logo.png";

export default function Header() {
  const { status } = useSession();

  return (
    <>
      <div className={styles.wave}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--background-color-wave)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            d="M0,192L60,160C120,128,240,64,360,53.3C480,43,600,85,720,133.3C840,181,960,235,1080,224C1200,213,1320,139,1380,101.3L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
          <path
            fill="url(#waveGradient)"
            d="M0,192L60,197.3C120,203,240,213,360,229.3C480,245,600,267,720,234.7C840,203,960,117,1080,96C1200,75,1320,117,1380,138.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>

      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image src={LogoImg} alt="ScubiBranches logo" />
          <h1>ScubiBranches</h1>
        </Link>

        <nav className={styles.nav}>
          <ul>
            {status === "authenticated" && (
              <>
                <li>
                  <NavLink href="/dives">My dives</NavLink>
                </li>
                <li>
                  <NavLink href="/profile">Profile</NavLink>
                </li>
              </>
            )}
            {status === "unauthenticated" && (
              <li>
                <NavLink href="/login">Login</NavLink>
              </li>
            )}
            <li>
              <NavLink href="/about">About</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
