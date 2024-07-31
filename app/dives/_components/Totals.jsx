import { useEffect, useState } from "react";
import { getDiveTotals } from "@/lib/actions/getDiveTotals";

import styles from "./Totals.module.css";
import Loader from "@/components/Loader";

export default function Totals() {
  const [data, setData] = useState({});
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

  const renderDataOrLoader = (data, suffix) => {
    return data ?? data === 0 ? <td>{data}{suffix}</td> : <td className={styles.loader}><Loader /></td>;
  };

  return (
    <article className={styles.overview}>
      <h3>Totals</h3>

      <table>
        <tbody>
          <tr>
            <td>Logged dives:</td>
            {renderDataOrLoader(data.totalDives)}
          </tr>
          <tr>
            <td>Dive time:</td>
            {renderDataOrLoader(data.totalTime, "min")}
          </tr>
          <tr>
            <td>Average depth:</td>
            {renderDataOrLoader(data.averageDepth, "m")}
          </tr>
          <tr>
            <td>Nudibranch Dives:</td>
            {renderDataOrLoader(data.nudibranchesSeen)}
          </tr>
          <tr>
            <td>Days since last dive:</td>
            {renderDataOrLoader(data.timeSinceLastDive)}
          </tr>
        </tbody>
      </table>
    </article>
  );
}
