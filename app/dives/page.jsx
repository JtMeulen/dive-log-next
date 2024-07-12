import Link from "next/link";
import { redirect } from "next/navigation";

import styles from "./page.module.css";
import DiveTile from "./_components/DiveTile";
import { getDives } from "@/lib/actions/getDives";

export default async function DivesPage() {
  const { dives, error } = await getDives();

  if (error) {
    // TODO: Show error message to user or move to a custom error page?
    return error.includes("Unauthorized") ? redirect("/login") : <p>ERROORR</p>;
  }

  const totalDives = dives.length;
  const totalTime = dives.reduce(
    (acc, dive) => acc + parseInt(dive.time || 0),
    0
  );
  const averageDepth = Math.round(
    dives.reduce((acc, dive) => acc + parseInt(dive.depth || 0), 0) / totalDives
  );

  // TODO: we should only take the latest dive, so need to filter dives by date
  // And exclude dives in the future (as they can be added with a future date)
  const timeSinceLastDive = Math.round(
    (Date.now() - new Date(dives[totalDives - 1].date).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h2>My Dive Log</h2>
        <p>Here you can find all the dives you have logged.</p>
      </header>

      <article className={styles.overview}>
        <h3>Totals</h3>
        <p>Logged dives: {totalDives}</p>
        <p>Dive time: {totalTime}mins</p>
        <p>Average depth: {averageDepth}m</p>
        <p>Days since last dive: {timeSinceLastDive}</p>
      </article>

      <h3>
        <Link href="/dives/new">Log a new dive!</Link>
      </h3>

      <ul className={styles.grid}>
        {dives.map((dive) => (
          <li key={dive._id?.toString()}>
            <DiveTile dive={dive} />
          </li>
        ))}
      </ul>
    </main>
  );
}
