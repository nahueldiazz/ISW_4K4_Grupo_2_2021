import React from "react";
import { Marker } from "google-maps-react";

export default function MapsMarker(props) {
  return (
    <Marker
      onClick={props.onClick}
      position={props.position}
      onMouseover={props.onMouseover}
      draggable={false}
    />
  );
}
