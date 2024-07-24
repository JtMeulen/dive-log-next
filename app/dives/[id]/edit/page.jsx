"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { getDive } from "@/lib/actions/getDive";
import { updateDive } from "@/lib/actions/updateDive";

import Input from "@/components/Input";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import ImagePicker from "@/components/ImagePicker";
import Loader from "@/components/Loader";
import Switch from "@/components/Switch";
import InputDatePicker from "@/components/InputDatePicker";
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

import styles from "./page.module.css";

export default function EditDivePage({ params }) {
  const { id } = params;
  const { status } = useSession();
  const router = useRouter();
  const formRef = useRef();
  const [defaultData, setDefaultData] = useState({});
  const [loading, setLoading] = useState(false);
  const [mapCoords, setMapCoords] = useState(false);

  useEffect(() => {
    async function fetchDive() {
      const data = await getDive(id);

      if (data.error && data.error.includes("Unauthorized")) {
        router.push("/login");
        return;
      }

      setDefaultData(data);
      setMapCoords(data.location_coords);
    }
    fetchDive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    const response = await updateDive(formData, id);

    if (response?.error) {
      toast.error(response.error);
      setLoading(false);
    }

    if (response?.dive) {
      formRef.current?.reset();
      router.push(`/dives/${id}`);
      toast.success("Dive updated! 🎉");
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Edit your dive!</h1>
      {/* TODO: loading state should not reset form data (just hide the form instead of not rendering) */}
      {loading || status === "loading" || !defaultData.dive ? (
        <Loader />
      ) : (
        <>
          <form onSubmit={handleSubmit} ref={formRef}>
            <Input
              type="text"
              name="title"
              label="Title of the dive"
              placeholder="e.g. Night dive at the pier"
              defaultValue={defaultData.dive.title}
              required
            />
            <Input
              type="text"
              name="location"
              label="Dive site"
              placeholder="e.g. Blue Hole, Gozo"
              defaultValue={defaultData.dive.location}
            />
            <Input
              type="text"
              name="description"
              label="Short description"
              max="80"
              placeholder="e.g. Saw so many nudibranches!"
              defaultValue={defaultData.dive.description}
            />
            <InputDatePicker
              name="date"
              label="Date and time"
              defaultValue={defaultData.dive.date}
              required
              withTime
            />
            <Input
              type="number"
              name="time"
              label="Dive time (minutes)"
              min="0"
              defaultValue={defaultData.dive.time}
            />
            <Input
              type="number"
              step="0.1"
              name="depth"
              label="Depth (meters)"
              min="0"
              defaultValue={defaultData.dive.depth}
            />
            <Textarea
              name="notes"
              label="Notes"
              placeholder={`- 20 nudibranches 💕\n- 4 turtles\n- ...`}
              defaultValue={defaultData.dive.notes}
            />
            <Switch
              name="seen_nudibranch"
              label="Seen any nudibranches?"
              defaultChecked={defaultData.dive.seen_nudibranch}
            />

            <ImagePicker
              name="image"
              label="Image"
              defaultImage={defaultData.dive.image}
            />

            <label className={styles.mapLabel}>Map location</label>
            <div className={styles.mapContainer}>
              <Map
                allowChange
                handleCoordsChange={onCoordsChange}
                coords={defaultData.dive.location_coords}
                showDefaultMarker
              />
            </div>

            <Button type="submit">Save</Button>
          </form>
        </>
      )}
    </main>
  );
}
