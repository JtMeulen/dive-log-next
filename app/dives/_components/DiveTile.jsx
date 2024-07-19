import Image from "next/image";
import Link from "next/link";

import imgPlaceholder from "@/public/dive_img_placeholder.jpg";
import nudiStamp from "@/public/nudi_stamp.png";

import styles from "./DiveTile.module.css";

export default function DiveTile({ dive }) {
  return (
    <Link href={`/dives/${dive._id?.toString()}`} className={styles.link}>
      <article className={styles.tile}>
        <header className={styles.imageWrapper}>
          <Image src={dive.image || imgPlaceholder} alt={dive.title} fill />
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
          <p className={styles.date}>{dive.date?.toDateString()}</p>
          <p className={styles.description}>{dive.description}</p>
          <div className={styles.stats}>
            <span>Max depth: {dive.depth}</span>
            <span>Time: {dive.time}</span>
          </div>
        </section>
      </article>
    </Link>
  );
}
