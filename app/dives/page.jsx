import { redirect } from "next/navigation";

import styles from "./page.module.css";
import ButtonLink from "@/components/ButtonLink";
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
  const averageDepth = dives.length
    ? Math.round(
        dives.reduce((acc, dive) => acc + parseInt(dive.depth || 0), 0) /
          totalDives
      )
    : 0;

  // TODO: we should only take the latest dive, so need to filter dives by date
  // And exclude dives in the future (as they can be added with a future date)
  const timeSinceLastDive = dives.length
    ? Math.round(
        (Date.now() - new Date(dives[0].date).getTime()) / (1000 * 60 * 60 * 24)
      )
    : 0;

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h2>My Dive Log</h2>
        <p>Here you can find all the dives you have logged.</p>
      </header>

      {dives.length === 0 ? (
        <>
          <p>No dives logged yet.</p>
          <ButtonLink href="/dives/new">Log your first dive!</ButtonLink>
        </>
      ) : (
        <>
          <ButtonLink href="/dives/new">Log a new dive!</ButtonLink>

          <article className={styles.overview}>
            <h3>Totals</h3>

            <table>
              <tbody>
                <tr>
                  <td>Logged dives:</td>
                  <td>{totalDives}</td>
                </tr>
                <tr>
                  <td>Dive time:</td>
                  <td>{totalTime}mins</td>
                </tr>
                <tr>
                  <td>Average depth:</td>
                  <td>{averageDepth}m</td>
                </tr>
                <tr>
                  <td>Nudibranch Dives:</td>
                  <td>{dives.filter((dive) => dive.seen_nudibranch).length}</td>
                </tr>
                <tr>
                  <td>Days since last dive:</td>
                  <td>{timeSinceLastDive}</td>
                </tr>
              </tbody>
            </table>
          </article>

          {/* TODO: Add filters, sorting and pagination  */}

          <ul className={styles.grid}>
            {dives.map((dive) => (
              <li key={dive._id?.toString()}>
                <DiveTile dive={dive} />
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
