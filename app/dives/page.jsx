"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { getDives } from "@/lib/actions/getDives";

import ButtonLink from "@/components/ButtonLink";
import Input from "@/components/Input";
import DiveTile from "./_components/DiveTile";
import Skeleton from "./_components/Skeleton";
import Totals from "./_components/Totals";

import styles from "./page.module.css";

export default function DivesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dives, setDives] = useState([]);
  const [sort, setSort] = useState("newest");
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { dives, error } = await getDives(sort, debouncedSearch);

      if (error) {
        router.push("/");
        return;
      }

      setDives(dives);
      setLoading(false);
    };

    fetchData();
  }, [router, sort, debouncedSearch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h2>My Dive Log</h2>
        <p>Here you can find all the dives you have logged.</p>
      </header>

      <ButtonLink href="/dives/new">Log a new dive!</ButtonLink>

      <Totals />

      <div className={styles.filters}>
        <Input
          type="text"
          name="search"
          placeholder="Search dives"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <select
          name="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={styles.sort}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="deepest">Deepest first</option>
          <option value="shallowest">Shallowest first</option>
          <option value="longest">Longest dive first</option>
          <option value="shortest">Shortest first</option>
          <option value="a-z">Alphabet (a-z)</option>
          <option value="z-a">Alphabet (z-a)</option>
        </select>
      </div>

      <ul className={styles.grid}>
        {loading ? (
          new Array(6).fill(null).map((_, index) => <Skeleton key={index} />)
        ) : (
          dives.map((dive) => (
            <li key={dive._id?.toString()}>
              <DiveTile dive={dive} />
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
