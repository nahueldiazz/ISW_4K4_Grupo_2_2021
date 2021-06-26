import React, { useEffect, useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import "./styles.scss";
import MapsMarker from "./marker";
import InfoWindowMaps from "./info-window";
import {
  buscarDomicilio,
  sugerirDomicilio,
  getDirections,
  getCoordenadas,
} from "../../api/ubicacion";

import BarraBusqueda from "../barra-busqueda";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

export function MapContainer(props) {
  const [initialCenter, setInitialCenter] = useState({
    lat: -31.417,
    lng: -64.183,
  });
  const [selectedPlace, setSelectedPlace] = useState([]);
  const [marker, setMarker] = useState({});
  const [dataPlace, setDataPlace] = useState({});
  const [infoWindowVisible, setInfoWindowVisible] = useState(true);
  const [errorSnack, setErrorSnack] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [map, setMap] = useState({});

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {}, [initialCenter]);

  useEffect(() => {
    if (props.selectedPlace) {
      let container = [];
      container.push(props.selectedPlace);
      setInitialCenter(props.selectedPlace);
      setSelectedPlace(container);
    }
  }, []);

  function onClickMap(mapProps, map, clickEvent) {
    let lat = clickEvent.latLng.lat();
    let lng = clickEvent.latLng.lng();
    let container = [];
    let place = {
      lat: lat,
      lng: lng,
    };
    container.push(place);
    setSelectedPlace(container);
    //getDataAbout(place);
    getDataAbout(place);
  }

  function onMarkerClick(props, marker) {
    setMarker(marker);
    setInfoWindowVisible(true);
  }

  function onCloseInfoWindow() {
    setInfoWindowVisible(false);
  }

  function onMouseOverMarker() {
    setInfoWindowVisible(!infoWindowVisible);
  }

  const getDataAbout = async (place) => {
    await getDirections(place.lat, place.lng)
      .then((res) => {
        let data = { direccion: res };
        setDataPlace(data);
        props.setDatosDomicilioMaps(data.direccion);
      })
      .catch((error) => {
        //setDataPlace({ direccion: "Fuera del ejido municipal" });
        props.setDatosDomicilioMaps({ direccion: "" });
        setErrorSnack(true);
        setErrorMessage(error.message);
        console.log(error);
      });
  };

  /*async function getDataAbout(place) {
    try {
      let data = await buscarDomicilio(place.lat, place.lng);
      setDataPlace(data);
      props.setDatosDomicilioMaps(data);
    } catch (error) {
      setDataPlace({ direccion: "Fuera del ejido municipal" });
      props.setDatosDomicilioMaps({ direccion: "Fuera del ejido municipal" });
      setErrorSnack(true);
      setErrorMessage(error.message);
      console.log(error);
    }
  }*/

  const onChangeBusquedaMaps = (event) => {
    let value = event.currentTarget.value;
    setBusqueda(value);
  };

  const onClickBuscar = async () => {
    await getCoordenadas(busqueda)
      .then((res) => {
        let latitud = Number.parseFloat(String(res.lat).replace(",", "."));
        let longitud = Number.parseFloat(String(res.lng).replace(",", "."));
        let container = [];
        let place = {
          lat: latitud,
          lng: longitud,
        };
        container.push(place);
        setSelectedPlace(container);
        getDataAbout(place);
        /*let value = arraySugerencia[0];
        let latitud = Number.parseFloat(
          String(value.latitud).replace(",", ".")
        );
        let longitud = Number.parseFloat(
          String(value.longitud).replace(",", ".")
        );
        let container = [];
        let place = {
          lat: latitud,
          lng: longitud,
        };
        container.push(place);
        setSelectedPlace(container);*/
        //getDataAbout(place);
      })
      .catch((error) => {
        console.log(error);
        setErrorSnack(true);
        setErrorMessage(error.message);
      });
  };

  const onEnterPress = (e) => {
    // Enter
    if (e.keyCode == 13) {
      //onClickBuscar();
    }
  };

  /*function initMap(): void {
    // The location of Uluru
    const cordoba = { lat: -31.417, lng: -64.183 };
    // The map, centered at Uluru
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 4,
        center: cordoba,
      }
    );

    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
  }*/

  return (
    <div id={"map"}>
      {props.isDialogOpen && (
        <div id="search-bar-maps">
          <BarraBusqueda
            onBusquedaChange={onChangeBusquedaMaps}
            onClickButton={onClickBuscar}
            texto={busqueda}
            busqueda={false}
            onKeyPress={onEnterPress}
          />
        </div>
      )}

      <Snackbar
        open={errorSnack}
        autoHideDuration={6000}
        onClose={() => {
          setErrorSnack(false);
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => {
            setErrorSnack(false);
          }}
          severity="error"
        >
          {errorMessage}
        </MuiAlert>
      </Snackbar>
      <Map
        google={props.google}
        onReady={(mapProps, map) => {
          setMap(map);
        }}
        initialCenter={initialCenter}
        center={initialCenter}
        onClick={props.selectedPlace ? () => {} : onClickMap}
        style={{}}
        containerStyle={{ position: "inherit" }}
      >
        {selectedPlace.length > 0 &&
          selectedPlace.map((place) => {
            return MapsMarker({
              onClick: onMarkerClick,
              position: place,
            });
          })}
        {dataPlace &&
          InfoWindowMaps({
            visible: infoWindowVisible,
            marker: marker,
            onClose: onCloseInfoWindow,
            children: (
              <div>
                <h3>{dataPlace.direccion}</h3>
              </div>
            ),
          })}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
})(MapContainer);
