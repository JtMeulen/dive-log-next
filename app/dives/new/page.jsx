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
  const [openMapModal, setOpenMapModal] = useState(false);

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData(e.currentTarget);
    // TODO: grab this from the result of the map modal
    formData.append("location_coords", '11.888298,124.3912335');

    const response = await newDiveAction(formData);

    if (response?.error) {
      // TODO: Show error message to user
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
      <h1>Log a new dive!</h1>

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
            <Input type="number" name="time" label="Dive time (minutes)" />
            <Input
              type="number"
              step="0.1"
              name="depth"
              label="Depth (meters)"
            />
            <Textarea
              name="notes"
              label="Notes"
              placeholder={`- 20 nudibranches 💕\n- 4 turtles\n- ...`}
            />
            <Switch name="seen_nudibranch" label="Seen any nudibranches?" />
            <ImagePicker name="image" label="Image" />
            <Button onClick={() => setOpenMapModal(true)} variant="secondary">
              Set dive location
            </Button>

            <Button type="submit">Log dive!</Button>
          </form>

          {/* Map Modal */}
          <Modal show={openMapModal}>
            <Map />

            <Button
              onClick={() => setOpenMapModal(false)}
              className={styles.save}
            >
              Save location
            </Button>
          </Modal>
        </>
      )}
    </main>
  );
}
