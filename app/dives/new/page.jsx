"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import styles from "./page.module.css";

import Input from "@/components/Input";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import ImagePicker from "@/components/ImagePicker";
import Loader from "@/components/Loader";
import { newDiveAction } from "@/lib/actions/newDive";
import Switch from "@/components/Switch";

export default function NewDivePage() {
  const { status } = useSession();
  const router = useRouter();
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
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
          <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
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
            <Switch
              name="seen_nudibranch"
              label="Seen any nudibranches?"
            />
            <ImagePicker name="image" label="Image" />

            <Button type="submit">Log dive!</Button>
          </form>
        </>
      )}
    </main>
  );
}
