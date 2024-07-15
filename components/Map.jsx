"use client";

import { useRef, useEffect } from "react";
import L from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

import mapMarker from "@/public/map_marker.png";

import styles from "./Map.module.css";

// IMPORTANT: This component needs to be imported dynamically to avoid the server trying to access the window object:
// import dynamic from 'next/dynamic'
// const Map = dynamic(() => import("@/components/Map"), { ssr: false });
export default function Map({
  coords = "52.35902777752081,4.811265602195501",
  showDefaultMarker,
  allowChange,
  handleCoordsChange = () => {},
  zoom = 12,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);

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

    // Create a marker icon
    const marker = L.icon({
      iconUrl: mapMarker.src,
      iconSize: [40, 40], // size of the icon
      iconAnchor: [20, 45], // point of the icon which will correspond to marker's location
    });

    // Handle clicking logic to change coordinates for edit modes
    if (allowChange) {
      map.current.on("click", function (e) {
        const popLocation = e.latlng;
        handleCoordsChange(popLocation);

        // Clear all previous markers
        map.current.eachLayer(function (layer) {
          if (layer instanceof L.Marker) {
            map.current.removeLayer(layer);
          }
        });

        L.marker(popLocation, { icon: marker }).addTo(map.current);
      });
    }

    if (showDefaultMarker) {
      L.marker(getCoords(coords), { icon: marker }).addTo(map.current);
    }
  }, [coords, zoom, allowChange, handleCoordsChange, showDefaultMarker]);

  const getCoords = (coords) => {
    return coords.split(",").map((coord) => parseFloat(coord));
  };

  return (
    <div
      ref={mapContainer}
      className={`${styles.map} ${allowChange && styles.fingerCursor}`}
    />
  );
}
