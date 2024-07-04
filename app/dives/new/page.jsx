"use client";

import styles from "./page.module.css";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import ImagePicker from "@/components/ui/ImagePicker";
import { newDiveAction } from "@/lib/actions/newDive";

export default function NewDivePage() {
  return (
    <main className={styles.main}>
      <h1>Log a new dive!</h1>

      <form className={styles.form} action={newDiveAction}>
        <Input type="text" name="title" label="Title of the dive" required />
        <Input type="text" name="location" label="Dive site" required />
        <Input
          type="text"
          name="description"
          label="Short description"
          required
        />
        <Input type="date" name="date" label="Date" required />
        <Input type="number" name="time" label="Dive time (minutes)" />
        <Input type="number" step="0.1" name="depth" label="Depth (meters)" />
        <Textarea name="notes" label="Notes" />
        <ImagePicker name="image" label="Image" />

        <Button type="submit">Log dive!</Button>
      </form>
    </main>
  );
}
