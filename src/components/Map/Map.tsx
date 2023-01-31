import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import styles from './Map.module.css';

mapboxgl.accessToken =
  'pk.eyJ1Ijoic3RhcnJ4cyIsImEiOiJjam9lZGppdGsxaDgxM2ttcmpncXNtMnpoIn0.7SJLcJzoWrgNDktWnAmTbQ';

const Map = ({ coordinates }: { coordinates: [number, number] }) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      center: [coordinates[1], coordinates[0]],
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 3,
    });
  });

  useEffect(() => {
    map.current.flyTo({
      center: [coordinates[1], coordinates[0]],
      essential: true,
    });
  }, [coordinates]);

  return <div ref={mapContainer} className={styles.map_container} />;
};

export default Map;
