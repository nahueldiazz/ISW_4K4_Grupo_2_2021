import axios from "axios";

export async function getDirections(latitud, longitud) {
  //const url = `https://maps.googleapis.com/maps/api/geocode/json?address=24%20Emilio%20Olmos%20485&key=AIzaSyAt7jiJ5Ewte9AIxfOMVSwxYU4oJDU2_8c`;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitud},${longitud}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  return await axios.get(url).then((response) => {
    //console.log(response.results[0].formatted_address);
    console.log(response.data.results[0].formatted_address);
    return response.data.results[0].formatted_address;
  });
}
export async function getCoordenadas(direccion) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${direccion}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  return await axios.get(url).then((response) => {
    //console.log(response.results[0].formatted_address);
    console.log(response.data.results[0].geometry.location);
    return response.data.results[0].geometry.location;
  });
}

export async function buscarDomicilio(latitud, longitud) {
  const token = localStorage.getItem("token");
  const url = `${process.env.REACT_APP_URL_WS}/v1/Domicilio/Buscar?token=${token}&latitud=${latitud}&longitud=${longitud}`;

  return await axios
    .get(url)
    .then((response) => {
      if (!response.data.ok) {
        throw Error(response.data.error || "Error procesando la solicitud");
      }
      return response.data.return;
    })
    .catch((error) => {
      console.log(error);
      throw Error(error || "Error procesando la solicitud");
    });
}

export async function sugerirDomicilio(busqueda) {
  const token = localStorage.getItem("token");
  const url = `/v1/Domicilio/Sugerir?token=${token}&busqueda=${busqueda}`;

  return await axios
    .get(url)
    .then((response) => {
      if (!response.data.ok) {
        throw Error(response.data.error || "Error procesando la solicitud");
      }
      return response.data.return;
    })
    .catch((error) => {
      console.log(error);
      throw Error(error || "Error procesando la solicitud");
    });
}
