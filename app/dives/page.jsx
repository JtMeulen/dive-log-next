"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { getDives } from "@/lib/actions/getDives";

import ButtonLink from "@/components/ButtonLink";
import DiveTile from "./_components/DiveTile";
import Totals from "./_components/Totals";

import styles from "./page.module.css";
import Loader from "@/components/Loader";

export default function DivesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dives, setDives] = useState([]);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
  
      const { dives, error } = await getDives(sort);
  
      if (error) {
        // TODO: Show error message to user or move to a custom error page?
        error.includes("Unauthorized") ? router.push("/") : router.push("/error");
        return;
      }
  
      setDives(dives);
      setLoading(false);
    };
  
    fetchData();
  }, [router, sort]);


  return loading ? (
    <Loader />
  ) : (
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

          <Totals dives={dives} />

          {/* TODO: extract to own component */}
          <select name="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="deepest">Deepest first</option>
            <option value="shallowest">Shallowest first</option>
            <option value="longest">Longest dive first</option>
            <option value="shortest">Shortest first</option>
            <option value="a-z">Alphabet (a-z)</option>
            <option value="z-a">Alphabet (z-a)</option>
          </select>

          {/* TODO: Add filters and pagination  */}

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
