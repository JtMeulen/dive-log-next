"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import { getDive } from "@/lib/actions/getDive";
import { deleteDive } from "@/lib/actions/deleteDive";

import ButtonLink from "@/components/ButtonLink";
import Button from "@/components/Button";
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

import styles from "./page.module.css";
import Loader from "@/components/Loader";

export default function DivePage({ params }) {
  const [data, setData] = useState({});
  const router = useRouter();
  const { id } = params;

  const handleDeleteDive = async () => {
    const response = await deleteDive(id);

    if (response?.error) {
      console.log(response.error);
    } else {
      router.push("/dives");
    }
  };

  useEffect(() => {
    async function fetchDive() {
      const data = await getDive(id);
      if (data.error && data.error.includes("Unauthorized")) {
        router.push("/login");
        return;
      }

      setData(data);
    }
    fetchDive();
  }, []);

  if (data.error) {
    <p>ERROORR</p>
  }

  const dive = data?.dive;

  return !dive ? (
    <Loader />
  ) : (
    <>
      <main className={styles.main}>
        {dive.image && (
          <div className={styles.imageWrapper}>
            <Image src={dive.image} alt={dive.title} fill />
          </div>
        )}

        {dive.location_coords && (
          <div className={styles.mapContainer}>
            <Map coords={dive.location_coords} showDefaultMarker />
          </div>
        )}

        <section className={styles.content}>
          <h1>{dive.title}</h1>
          <p>{dive.date?.toDateString()}</p>
          <p>{dive.location}</p>
          <p>{dive.description}</p>
          <p>Depth: {dive.depth}m</p>
          <p>Dive time: {dive.time}mins</p>
          <p>Nudibranch seen: {dive.seen_nudibranch ? "Yes!" : "No :("}</p>
          {dive.notes && (
            <>
              <p className={styles.label}>
                <em>Notes:</em>
              </p>
              <pre className={styles.notes}>{dive.notes}</pre>
            </>
          )}
        </section>

        <ButtonLink href={`/dives/${id}/edit`} variant="primary">
          Edit this dive
        </ButtonLink>
        <Button variant="secondary" onClick={handleDeleteDive}>
          Delete this dive
        </Button>
      </main>
    </>
  );
}
