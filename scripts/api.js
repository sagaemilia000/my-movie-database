import oData from '../data/data.js';
import { moviesToList, randomTrailers, searchedMovieResult } from "/scripts/domUtils.js";
import { renderTrailers } from './modules/carousel.js';

export async function fetchTopMovies() {
    const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
    let movies = await response.json();
    oData.topMovieList = movies;

    let top20Movies = movies.slice(0, 20);

    moviesToList(top20Movies)
    
    let trailers = randomTrailers(top20Movies, 5);
    trailers.forEach((trailer, i) => {
        renderTrailers(trailer, i + 1);
    });

}

export async function fetchSearch(query) {
    
    try {
        const searchResponse = await fetch(`http://www.omdbapi.com/?apikey=1a195302&s=${query}`)
        let data = await searchResponse.json();

        if(data.Response === 'False') {
            throw new Error(`Inga filmer med "${query}" hittades`);
        }
        
        searchedMovieResult(data.Search)

    } catch (error) {
        let errorMsg = document.createElement('p')
        errorMsg.textContent = error.message
        errorMsg.classList.add('error-msg')
        
        let searchContainer = document.querySelector('#searchContainer');
        if(searchContainer) {
            searchContainer.appendChild(errorMsg);
        }
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.querySelector('#searchBtn');
    const searchInput = document.querySelector('#searchInput');

        searchBtn.addEventListener('click', (event) => {
            event.preventDefault();
            let query = searchInput.value.trim();

            if (query) {
                localStorage.setItem('searchQuery', query);
                window.location.href = '/search.html';
                console.log(query)
            } 
        });
});

document.addEventListener('DOMContentLoaded', () => {
    const query = localStorage.getItem('searchQuery');

    if (query) {
        fetchSearch(query);
    }
});
