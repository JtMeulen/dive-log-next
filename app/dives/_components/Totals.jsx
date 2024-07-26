import { useEffect, useState } from "react";
import { getDiveTotals } from "@/lib/actions/getDiveTotals";

import styles from "./Totals.module.css";
import Loader from "@/components/Loader";

export default function Totals() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getDiveTotals();

      if (data) {
        setData(data);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return loading ? (
    <div className={styles.loader}>
      <Loader />
    </div>
  ) : !data ? null : (
    <article className={styles.overview}>
      <h3>Totals</h3>

      <table>
        <tbody>
          <tr>
            <td>Logged dives:</td>
            <td>{data.totalDives}</td>
          </tr>
          <tr>
            <td>Dive time:</td>
            <td>{data.totalTime}mins</td>
          </tr>
          <tr>
            <td>Average depth:</td>
            <td>{data.averageDepth}m</td>
          </tr>
          <tr>
            <td>Nudibranch Dives:</td>
            <td>{data.nudibranchesSeen}</td>
          </tr>
          <tr>
            <td>Days since last dive:</td>
            <td>{data.timeSinceLastDive}</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}
