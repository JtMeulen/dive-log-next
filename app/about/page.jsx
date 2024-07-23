import PwaDownload from "@/components/PwaDownload";

import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <h1>About</h1>
      <p>
        This webapp is build as a fun side project for me and my wife to keep
        track of our scuba dives. Many dive apps are usually too complex with
        too many features that we don&apos;t need, so this webapp is built to
        keep logging simple, but more importantly; nudibranch focused!
      </p>

      <PwaDownload />
    </main>
  );
}
