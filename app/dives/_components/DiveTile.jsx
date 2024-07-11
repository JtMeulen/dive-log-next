import Image from "next/image";
import Link from "next/link";

import styles from "./DiveTile.module.css";

// TODO: Cleanup props
export default function DiveTile({
  title,
  location = "",
  date = "",
  depth = "",
  time = "",
  image = "",
  description = "",
  slug,
}) {
  return (
    <Link href={`/dives/${slug}`} className={styles.link}>
      <article className={styles.tile}>
        <header className={styles.imageWrapper}>
          <Image src={image} alt={title} fill />
        </header>
        <section className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.location}>
            <em>{location}</em>
          </p>
          <p className={styles.date}>{date}</p>
          <p className={styles.description}>{description}</p>
          <div className={styles.stats}>
            <span>Max depth: {depth}</span>
            <span>Time: {time}</span>
          </div>
        </section>
      </article>
    </Link>
  );
}
