const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}`)
        .then((response) => { if (response.status === 200) { return response.json() } })
}


export default { fetchCountries };
