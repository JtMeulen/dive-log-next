"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

import Input from "@/components/Input";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import ImagePicker from "@/components/ImagePicker";
import Loader from "@/components/Loader";
import { newDiveAction } from "@/lib/actions/newDive";
import { getUser } from "@/lib/actions/getUser";

export default function NewDivePage() {
  const router = useRouter();
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  // TODO: protect client side route from adding new dives (BE already covers it though)

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

      {loading ? (
        <Loader />
      ) : (
        <>
          <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
            <Input
              type="text"
              name="title"
              label="Title of the dive"
              required
            />
            <Input type="text" name="location" label="Dive site" />
            <Input type="text" name="description" label="Short description" />
            <Input type="date" name="date" label="Date" required />
            <Input type="number" name="time" label="Dive time (minutes)" />
            <Input
              type="number"
              step="0.1"
              name="depth"
              label="Depth (meters)"
            />
            <Textarea name="notes" label="Notes" />
            <ImagePicker name="image" label="Image" />

            <Button type="submit">Log dive!</Button>
          </form>
        </>
      )}
    </main>
  );
}
