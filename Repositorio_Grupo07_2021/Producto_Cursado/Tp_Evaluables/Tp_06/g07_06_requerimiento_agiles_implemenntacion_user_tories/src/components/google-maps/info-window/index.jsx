import React from "react";
import { InfoWindow } from "google-maps-react";

export default function InfoWindowMaps(props) {
  return (
    <InfoWindow
      visible={props.visible}
      marker={props.marker}
      onClose={props.onClose}
    >
      {props.children}
    </InfoWindow>
  );
}
