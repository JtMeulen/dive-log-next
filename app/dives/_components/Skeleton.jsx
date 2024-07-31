import styles from "./Skeleton.module.css";

export default function Skeleton() {
  return (
    <article className={styles.tile}>
      <header className={styles.shimmer}></header>

      <section className={styles.content}>
        <div className={styles.shimmer}></div>
        <div className={styles.shimmer}></div>
        <div className={styles.shimmer}></div>
      </section>
    </article>
  );
}
