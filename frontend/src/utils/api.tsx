import { City, currentWeatherOpenWeatherAPIResponse } from './types';
const OWM_API_URL = 'https://api.openweathermap.org/data/2.5';
const LOCAL_URL = 'http://localhost:5000';

export const getCurrentWeather = async (cityId: number): Promise<currentWeatherOpenWeatherAPIResponse> => {
  let params = {
    appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY || '',
    id: cityId.toString(),
    units: 'metric',
  }

  let searchParams = new URLSearchParams(params);

  let response = await fetch(`${OWM_API_URL}/weather?${searchParams}`);
  if (response.status !== 200) {
    return {};
  }
  let jsonResponse = await response.json();

  return jsonResponse;
}

export const getSuggestions = async (name: string): Promise<City[]> => {
  let searchParams = new URLSearchParams({name, limit: '10'});
  let response = await fetch(`${LOCAL_URL}/suggestions?${searchParams}`);
  if (response.status !== 200) {
    return [];
  }
  const jsonResponse = await response.json();
  return jsonResponse;
}

export const getCities = async () => {
  let response = await fetch(`${LOCAL_URL}/cities`);
  if (response.status !== 200) {
    return [];
  }
  const jsonResponse = await response.json();
  return jsonResponse;
}