import countryCardTmp from './templates/country-card.hbs'
import './styles/main.css'
import '@pnotify/core/dist/BrightTheme.css';
import API from './js/fetchCountries'
import getRefs from './js/get_refs';
import _ from 'lodash';
import { alert, notice } from '@pnotify/core';


const refs = getRefs();
const debouncedSearch = _.debounce(onSearch, 500);

refs.searchInput.addEventListener('keydown', debouncedSearch);

function onSearch(e) {
    e.preventDefault();
    listReset();

    const input = e.target.value.trim();

    if (input.length > 0) {
        API.fetchCountries(input)
            .then(countrySearcher)
            .catch(onError);
    };
};

function onError(error) {
    alert({
        type: 'error',
        text: 'No such country. Try again!',
        delay: 100,
        animateSpeed: 'fast',
    });
};

function countrySearcher(countries) {
    if (countries.length === 1) {
        createCountryCard(countries);

    } else if (countries.length > 1 && countries.length <= 10) {
        renderCountriesList(countries);

    } else if (countries.length > 10) {
        notice({
            type: 'error',
            text: 'Please enter a more specific query!',
            animateSpeed: 'fast',
            delay: 100,
        });
    };
}

function listReset() {
    refs.countriesList.textContent = '';
    refs.countryCard.textContent = '';
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
    refs.countryCard.insertAdjacentHTML('beforeend', countryCardTmp(country));
};
