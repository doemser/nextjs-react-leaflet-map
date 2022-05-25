import { useState, useEffect } from "react";
import * as L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

//////////////////////////// positions to map over

const positions = [
  { name: "hier ist was", lat: 52, long: 8 },
  { name: "hier ist was anderes", lat: 51, long: 9 },
];

//////////////////////////// our custom icon

const greenIcon = L.icon({
  iconUrl: "leaf-green.png",
  shadowUrl: "leaf-shadow.png",

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

//////////////////////////// this component should be in a separate file ;)

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

//////////////////////////// our map component

export default function Map() {
  return (
    <MapContainer
      style={{ height: "400px", width: "400px" }}
      center={[30, 8]}
      zoom={12}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {positions.map((position) => {
        return (
          <Marker position={[position.lat, position.long]} icon={greenIcon}>
            <Popup>{position.name}</Popup>
          </Marker>
        );
      })}

      <LocationMarker />
    </MapContainer>
  );
}
