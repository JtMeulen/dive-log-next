"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

import { getDive } from "@/lib/actions/getDive";
import { deleteDive } from "@/lib/actions/deleteDive";

import ButtonLink from "@/components/ButtonLink";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";
import Divider from "@/components/Divider";
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

import logo from "@/public/logo.png";

import styles from "./page.module.css";

export default function DivePage({ params }) {
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { id } = params;

  const handleDeleteDive = async () => {
    const response = await deleteDive(id);

    if (response?.error) {
      toast.error(response.error);
    } else {
      router.push("/dives");
      toast.success("Dive deleted! 🗑️");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.error) {
    toast.error(data.error);
    return <p>Something went wrong!</p>;
  }

  const dive = data?.dive;

  return !dive ? (
    <Loader />
  ) : (
    <>
      <main className={styles.main}>
        <div className={styles.imageWrapper}>
          <Image src={dive.image || logo} alt={dive.title} fill />
        </div>

        {dive.location_coords && (
          <div className={styles.mapContainer}>
            <Map coords={dive.location_coords} showDefaultMarker />
          </div>
        )}

        <section className={styles.content}>
          <h1 className={styles.title}>{dive.title}</h1>
          <p className={styles.date}>
            <em>{dive.date?.toDateString()}</em>
          </p>
          <p className={styles.location}>{dive.location}</p>

          <p>{dive.description}</p>

          <Divider>stats</Divider>
          <ul className={styles.stats}>
            {dive.depth && (
              <li>
                <strong>Depth:</strong> {dive.depth}m
              </li>
            )}
            {dive.time && (
              <li>
                <strong>Dive time:</strong> {dive.time}mins
              </li>
            )}
            <li>
              <strong>Nudibranch seen:</strong>{" "}
              {dive.seen_nudibranch ? "Yes!" : "No :("}
            </li>
          </ul>

          {dive.notes && (
            <>
              <Divider className={styles.divider}>notes</Divider>
              <pre className={styles.notes}>{dive.notes}</pre>
            </>
          )}
        </section>

        <div className={styles.actions}>
          <ButtonLink href={`/dives/${id}/edit`} variant="primary">
            Edit this dive
          </ButtonLink>
          <Button variant="danger" onClick={() => setShowModal(true)}>
            Delete this dive
          </Button>
        </div>
      </main>

      {/* Confirm modal for delete action */}
      <Modal show={showModal} closeButtonHandler={() => setShowModal(false)}>
        <p className={styles.modalText}>
          Are you sure you want to delete this dive?
        </p>
        <div className={styles.modalButtons}>
          <Button variant="danger" onClick={handleDeleteDive}>
            Yes, delete this dive
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}
