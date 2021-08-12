import countryCardTmp from './templates/country-card.hbs'
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
    listReset();

    const input = e.target.value;
    // console.log(input);

    API.fetchCountries(input)
        .then((countries) => {
            // console.log(countries);
            if (countries.length === 1) {
                createCountryCard(countries);

            } else if (countries.length > 1 && countries.length <= 10) {
                renderCountriesList(countries);

            } else if (countries.length > 10) {
                alert({
                    type: 'error',
                    text: 'Please enter a more specific query!',
                });
                let style = document.createElement('style');
                document.head.appendChild(style);
                style.sheet.insertRule('.pnotify-container {margin-left: 37%;}');
            }
        })
        .catch(error => {
            onError();
        })
    // .finally(() => refs.searchInput.reset());
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

function onError(error) {
    alert({
        type: 'error',
        text: 'No such country. Try again!',
    });
    let style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule('.pnotify-container {margin-left: 37%;}');
};

