import Image from "next/image";
import Link from "next/link";

import logo from "@/public/logo.png";
import nudiStamp from "@/public/nudi_stamp.png";

import styles from "./DiveTile.module.css";

export default function DiveTile({ dive }) {
  return (
    <Link href={`/dives/${dive._id?.toString()}`} className={styles.link}>
      <article className={styles.tile}>
        <header className={styles.imageWrapper}>
          <Image src={dive.image || logo} alt={dive.title} fill />
        </header>
        {dive.seen_nudibranch && (
          <Image
            src={nudiStamp}
            alt="Nudibranch seen stamp"
            className={styles.nudiStamp}
          />
        )}
        <section className={styles.content}>
          <h3 className={styles.title}>{dive.title}</h3>
          <p className={styles.location}>
            <em>{dive.location}</em>
          </p>
          <p className={styles.date}>
            {dive.date && new Date(dive.date).toDateString() + " at " + new Date(dive.date).toTimeString().slice(0, 5)}
          </p>
          <p className={styles.description}>{dive.description}</p>
          <div className={styles.stats}>
            {dive.depth && <span>Max depth: {dive.depth}m</span>}
            {dive.time && <span>Time: {dive.time}min</span>}
          </div>
        </section>
      </article>
    </Link>
  );
}
