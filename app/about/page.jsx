import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <h1>About</h1>
      <p>
        This website is build as a fun side project for me and my wife to keep
        track of our scuba dives. Many dive apps are usually too complex with
        too many features that we don&apos;t need.
      </p>

      <h2>Contact</h2>
      <p>
        If you have any questions or feedback, please feel free to reach out to
        me at ...
      </p>
    </main>
  );
}
