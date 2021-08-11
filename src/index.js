import './styles/main.css'
import '@pnotify/core/dist/BrightTheme.css';
import API from './js/fetchCountries'
import getRefs from './js/get_refs';
import _ from 'lodash';
import { alert } from '@pnotify/core';


const refs = getRefs();
const debouncedSearch = _.debounce(onSearch, 500);

refs.searchInput.addEventListener('keydown', debouncedSearch);


function onSearch(e) {
    e.preventDefault();

    const input = e.target.value;

    API.fetchCountries(input)
        .then((countries) => {
            if (countries.length >= 1 && countries.length <= 10) {
                renderCountriesList(countries);
            } else {
                onError();
            }
            if (countries.length === 1) {
                console.log(input);
            }
        })
        .catch(onError)
        .finally(() => refs.searchInput.reset());
}


function renderCountriesList(countries) {
    const searchedCountries = countries.map(country => {
        const countriesListItem = document.createElement('li');
        countriesListItem.textContent = `${country.name}`;
        return countriesListItem;
    });
    refs.countriesList.append(...searchedCountries);
};

function createCountryCard(country) {
    const countryCard = document.querySelector('.country');
    countryCard.insertAdjacentHTML('beforeend',)
};

function onError(error) {
    alert({
        type: 'error',
        text: 'Please enter a more specific query!',
    });
    let style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule('.pnotify-container {margin-left: 37%;}');
}
