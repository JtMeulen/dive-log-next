"use client";

import { useState, useEffect } from "react";

import Button from "@/components/Button";
import styles from "./PwaDownload.module.css";

export default function PwaDownload() {
  const [showInstall, setShowInstall] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();

      // Store the event so it can be triggered later.
      setInstallPrompt(e);

      // Update UI notify the user they can install the PWA
      setShowInstall(true);
    });
  }, []);

  const handleInstall = async () => {
    installPrompt.prompt();
  };

  return (
    showInstall && (
      <section className={styles.section}>
        <h2>Download the App</h2>
        <p>
          This website is also available as a PWA (Progressive Web App). You can install
          the app on your device by clicking this button below.
        </p>
        <Button onClick={handleInstall}>Install App</Button>
      </section>
    )
  );
}
