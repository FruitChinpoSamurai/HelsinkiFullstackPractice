import axios from "axios";

const baseUrlCountries = 'https://studies.cs.helsinki.fi/restcountries/api/';
const baseUrlWeather = 'https://api.open-meteo.com/v1/forecast?';

const getAllCountries = () => {
    const request = axios.get(`${baseUrlCountries}/all`);
    return request.then(response => response.data);
}

const getWeather = (lat, lng) => {
    const request = axios.get(`${baseUrlWeather}latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,windspeed_10m_max&timezone=auto`);
    return request.then(response => response.data);
}

const countryServices = { getAllCountries, getWeather };
export default countryServices;