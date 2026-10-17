import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import styles from './MapboxMap.module.css';

mapboxgl.accessToken =
  'pk.eyJ1Ijoic3RhcnJ4cyIsImEiOiJjam9lZGppdGsxaDgxM2ttcmpncXNtMnpoIn0.7SJLcJzoWrgNDktWnAmTbQ';

const MapboxMap = ({
  coordinates,
}: {
  coordinates: { lat: number; lng: number };
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (!mapContainer.current) return;
    map.current = new mapboxgl.Map({
      center: [coordinates.lng, coordinates.lat],
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 3,
    });
  });

  useEffect(() => {
    map.current?.flyTo({
      center: [coordinates.lng, coordinates.lat],
      essential: true,
    });
  }, [coordinates]);

  return <div ref={mapContainer} className={styles.map_container} />;
};

export default MapboxMap;
