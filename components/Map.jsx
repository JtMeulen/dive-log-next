"use client";

import React, { useRef, useEffect, useState } from "react";
import L from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

import styles from "./Map.module.css";

// IMPORTANT: This component needs to be imported dynamically to avoid the server trying to access the window object:
// import dynamic from 'next/dynamic'
// const Map = dynamic(() => import("@/components/Map"), { ssr: false });
export default function Map({ coords = "52.507932,13.338414" }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom] = useState(12);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(getCoords(coords)),
      zoom: zoom,
    });

    // Create a MapTiler Layer inside Leaflet
    const mtLayer = new MaptilerLayer({
      apiKey: process.env.NEXT_PUBLIC_MAPTILER_API_KEY,
    }).addTo(map.current);
  }, [coords, zoom]);

  const getCoords = (coords) => {
    return coords.split(",").map((coord) => parseFloat(coord));
  };

  return (
    <div className={styles.mapWrap}>
      <div ref={mapContainer} className={styles.map}/>
    </div>
  )
}
