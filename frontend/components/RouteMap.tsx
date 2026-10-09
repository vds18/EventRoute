"use client";

import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { RouteResult } from "../types/journey";

interface RouteMapProps {
  route: RouteResult;
  start: {
    name: string;
    lat: number;
    lng: number;
  };
  destination: {
    name: string;
    lat: number;
    lng: number;
  };
}

export default function RouteMap({
  route,
  start,
  destination,
}: RouteMapProps) {
  const routeCoordinates = route.geometry.coordinates.map(
    ([lng, lat]) => [lat, lng] as [number, number]
  );

  const startIcon = L.divIcon({
    className: "",
    html: `
      <div style="
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: #2563eb;
        border: 4px solid white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.4);
      "></div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });

  const destinationIcon = L.divIcon({
    className: "",
    html: `
      <div style="
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: #10b981;
        border: 4px solid white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.4);
      "></div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">
      <MapContainer
        center={routeCoordinates[0]}
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[start.lat, start.lng]}
          icon={startIcon}
        >
          <Popup>
            <strong>Starting Point</strong>
            <br />
            {start.name}
          </Popup>
        </Marker>

        <Marker
          position={[destination.lat, destination.lng]}
          icon={destinationIcon}
        >
          <Popup>
            <strong>Destination</strong>
            <br />
            {destination.name}
          </Popup>
        </Marker>

        <Polyline
          positions={routeCoordinates}
          pathOptions={{
            color: "#3b82f6",
            weight: 6,
          }}
        />
      </MapContainer>
    </div>
  );
}