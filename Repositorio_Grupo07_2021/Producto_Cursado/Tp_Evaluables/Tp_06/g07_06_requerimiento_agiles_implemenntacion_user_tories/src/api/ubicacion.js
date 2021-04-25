import axios from "axios";

export async function getDirections(latitud, longitud) {
  //const url = `https://maps.googleapis.com/maps/api/geocode/json?address=24%20Emilio%20Olmos%20485&key=AIzaSyAt7jiJ5Ewte9AIxfOMVSwxYU4oJDU2_8c`;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitud},${longitud}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  return await axios.get(url).then((response) => {
    return response.data.results[0].formatted_address;
  });
}
export async function getCoordenadas(direccion) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${direccion}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  return await axios.get(url).then((response) => {
    return response.data.results[0].geometry.location;
  });
}
