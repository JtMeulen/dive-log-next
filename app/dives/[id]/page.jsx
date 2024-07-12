import { redirect } from "next/navigation";
import Image from "next/image";

import styles from "./page.module.css";
import ButtonLink from "@/components/ButtonLink";
import Button from "@/components/Button";
import { getDive } from "@/lib/actions/getDive";

import dummyImage from "@/public/dummy/img-1.jpg";

export default async function DivePage({ params }) {
  const { id } = params;

  const { dive, error } = await getDive(id);

  if (error) {
    // TODO: Show error message to user or move to a custom error page?
    return error.includes("Unauthorized") ? redirect("/login") : <p>ERROORR</p>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.imageWrapper}>
        <Image src={dummyImage} alt={dive.title} fill />
      </div>

      <section className={styles.content}>
        <h1>{dive.title}</h1>
        <p>{dive.date?.toDateString()}</p>
        <p>{dive.location}</p>
        <p>{dive.description}</p>
        <p>Depth: {dive.depth}m</p>
        <p>Dive time: {dive.time}mins</p>
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
      <Button variant="secondary">Delete this dive</Button>
    </main>
  );
}
