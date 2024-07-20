import styles from "./page.module.css";

export default function OfflinePage() {
  return (
    <main className={styles.main}>
      <h1>Seem like you&apos;re offline.</h1>
      <p>Please wait untill you are connected to the internet to try again!</p>
    </main>
  );
}
