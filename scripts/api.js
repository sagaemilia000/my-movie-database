import { moviesToList, randomTrailers, searchedMovieResult, movieDetailsToDom, showFavorites } from "/scripts/domUtils.js";
import { renderTrailers } from './modules/carousel.js';

let oData = { topMovieList: [] };

export async function fetchTopMovies() {
    
    try {
        const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
        let movies = await response.json();

        if (!movies || movies.length === 0) {
            throw new Error('Could not find top-movies');
        }

        oData.topMovieList = movies;

        let top20Movies = movies.slice(0, 20);
        moviesToList(top20Movies)
        
        let trailers = randomTrailers(top20Movies, 5);
        trailers.forEach((trailer, i) => {
            renderTrailers(trailer, i + 1);
        });
    } catch(error) {
        let noTopMovies = document.createElement('p');
        noTopMovies.textContent = error.message;
        noTopMovies.classList.add('error-msg');

        let noTopMoviesCont = document.querySelector('#noTopMovies');
        if(noTopMoviesCont) {
            noTopMoviesCont.innerHTML = '';
            noTopMoviesCont.appendChild(noTopMovies);
        }
    }
}

export async function fetchSearch(query) {
    
    try {
        const searchResponse = await fetch(`http://www.omdbapi.com/?apikey=1a195302&s=${query}`)
        let data = await searchResponse.json();

        if(data.Response === 'False') {
            throw new Error(`No movies with "${query}" was found`);
        }
        
        searchedMovieResult(data.Search)

    } catch (error) {
        let errorMsg = document.createElement('p')
        errorMsg.textContent = error.message
        errorMsg.classList.add('error-msg')
        
        let errorContainer = document.querySelector('.error-container');
        if(errorContainer) {
            errorContainer.appendChild(errorMsg);
        }
    }
    
};

function searchButton() {
    const searchBtn = document.querySelector('#searchBtn');
    const searchInput = document.querySelector('#searchInput');

    if (!searchBtn || !searchInput) return;

        searchBtn.addEventListener('click', (event) => {
            event.preventDefault();
            let query = searchInput.value.trim();

            if (query) {
                localStorage.setItem('searchQuery', query);
                window.location.href = '/search.html';
                console.log(query)
            } 
        });
};

function searchQry() {
    const query = localStorage.getItem('searchQuery');

    if (query) {
        fetchSearch(query);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    searchButton();
    searchQry();
});

export async function fetchMovieDetails(movieId) {
    try {
        const detailResposne = await fetch(`http://www.omdbapi.com/?apikey=1a195302&plot=full&i=${movieId}`)
        let detailsData = await detailResposne.json();
    
        if(detailsData.Response === 'False') {
            throw new Error('Could not find movie details')
        }

        movieDetailsToDom(detailsData)
    

        } catch(error) {
            let noMovieDetails = document.createElement('p');
            noMovieDetails.textContent = error.message;
            noMovieDetails.classList.add('error-msg');

            let noMovieDetailsCont = document.querySelector('#noMovieDetails');
            if (noMovieDetailsCont) {
                noMovieDetailsCont.innerHTML = '';
                noMovieDetailsCont.appendChild(noMovieDetails);
            }
    }

};

document.addEventListener('DOMContentLoaded', () => {
    const movieId = localStorage.getItem('selectedMovieId');

    if (movieId) {
        fetchMovieDetails(movieId);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('#searchInput');
    if (searchInput) searchInput.value = ''; 
});

export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
};

export function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

document.addEventListener('DOMContentLoaded', showFavorites);


