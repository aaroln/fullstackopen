import axios from 'axios';
const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=`;

const getWeather = (capital) => {
    const request = axios.get(`${baseUrl}${capital}`);
    return request.then(response => response.data.current);
} 

export default getWeather;