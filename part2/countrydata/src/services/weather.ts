import axios from "axios";

const baseURLWeather: string =
  "http://api.openweathermap.org/data/2.5/weather?";
const baseURLCoordinates: string =
  "http://api.openweathermap.org/geo/1.0/direct?q=";

const getWeather = (capital: string, countrycode: string) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const geoRequest = axios.get(
    `${baseURLCoordinates}${capital},${countrycode}&limit=1&appid=${api_key}`
  );

  return geoRequest.then((response) => {
    const lat = response.data[0].lat;
    const lon = response.data[0].lon;
    const weatherRequest = axios.get(
      `${baseURLWeather}lat=${lat}&lon=${lon}&appid=${api_key}`
    );
    return weatherRequest.then((response) => response.data);
  });
};

export default { getWeather };
