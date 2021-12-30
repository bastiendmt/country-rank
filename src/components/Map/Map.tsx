import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3RhcnJ4cyIsImEiOiJjam9lZGppdGsxaDgxM2ttcmpncXNtMnpoIn0.7SJLcJzoWrgNDktWnAmTbQ";

const Map = ({ coordinates }: { coordinates: [number, number] }) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [lat, lng] = [coordinates[0], coordinates[1]];

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 3,
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
