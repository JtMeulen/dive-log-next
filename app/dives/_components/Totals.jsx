import styles from "./Totals.module.css";

export default function Totals({ dives }) {
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

  const timeSinceLastDive = dives.length
    ? Math.round(
        (Date.now() -
          new Date(
            dives.filter((a) => new Date(a.date) < new Date())[0].date
          ).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  return (
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
  );
}
