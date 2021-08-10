import './styles/main.css'
import API from './js/fetchCountries'
import fetchCountries from './js/fetchCountries';
import getRefs from './js/get_refs';
// import { alert, notice, info, success, error } from '@pnotify/core';


const refs = getRefs();

refs.searchInput.addEventListener('keydown', onSearch);


function onSearch(e) {
    e.preventDefault();

    const input = e.currentTarget;
    const searchQuery = input.textContent;
    console.log(searchQuery);

    API.fetchCountries(searchQuery)
        .then(renderCountriesList)
        .catch(onError)
        .finally(() => { input.reset() });

    console.log(refs.searchInput.value);
}


function renderCountriesList(countries) {
    const searchedCountries = countries.map(country => {
        const countriesListItem = document.createElement('li');
        countriesListItem.textContent = `${country}`;
        return ingredientsListItem;
    });
    refs.countriesList.append(...searchedCountries);
};

function onError() {
    const myError = error({
        text: "Too many matches found. Please enter a more specific query!"
    });
    return myError;
}
// _.debounce(onSearch, 500)