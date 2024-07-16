"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

import { newDiveAction } from "@/lib/actions/newDive";

import Input from "@/components/Input";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import ImagePicker from "@/components/ImagePicker";
import Loader from "@/components/Loader";
import Switch from "@/components/Switch";
import Modal from "@/components/Modal";
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

import styles from "./page.module.css";

export default function NewDivePage() {
  const { status } = useSession();
  const router = useRouter();
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [mapCoords, setMapCoords] = useState(false);

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const onCoordsChange = (coords) => {
    setMapCoords(coords);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    if (mapCoords) {
      formData.append("location_coords", `${mapCoords.lat},${mapCoords.lng}`);
    }

    const response = await newDiveAction(formData);

    if (response?.error) {
      // TODO: Show error message to user by means of a toaster
      console.log(response.error);
      setLoading(false);
    }

    if (response?.dive) {
      formRef.current?.reset();
      router.push("/dives");
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Log a new dive!</h1>

      {loading || status === "loading" ? (
        <Loader />
      ) : (
        <>
          <form onSubmit={handleSubmit} ref={formRef}>
            <Input
              type="text"
              name="title"
              label="Title of the dive"
              placeholder="e.g. Night dive at the pier"
              required
            />
            <Input
              type="text"
              name="location"
              label="Dive site"
              placeholder="e.g. Blue Hole, Gozo"
            />
            <Input
              type="text"
              name="description"
              label="Short description"
              max="80"
              placeholder="e.g. Saw so many nudibranches!"
            />
            <Input type="date" name="date" label="Date" required />
            <Input
              type="number"
              name="time"
              label="Dive time (minutes)"
              min="0"
            />
            <Input
              type="number"
              step="0.1"
              name="depth"
              label="Depth (meters)"
              min="0"
            />
            <Textarea
              name="notes"
              label="Notes"
              placeholder={`- 20 nudibranches 💕\n- 4 turtles\n- ...`}
            />
            <Switch name="seen_nudibranch" label="Seen any nudibranches?" />

            <ImagePicker name="image" label="Image" />

            <div className={styles.mapContainer}>
              <Map allowChange handleCoordsChange={onCoordsChange} />
            </div>

            <Button type="submit">Log dive!</Button>
          </form>
        </>
      )}
    </main>
  );
}
