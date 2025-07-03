import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const getCountries = (country) => {
    const request = axios.get(`${baseUrl}`);
    return request.then(response => response.data.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase())));
}

export default getCountries;