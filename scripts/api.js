import oData from '../data/data.js';
import { moviesToList, randomTrailers, searchedMovieResult, movieDetailsToDom, showFavorites } from "/scripts/domUtils.js";
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
    
}

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
}

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
        throw new Error('Filmen kunde inte hämtas')
    }

    
    movieDetailsToDom(detailsData)
    

    } catch(error) {
        console.log('error')
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const movieId = localStorage.getItem('selectedMovieId');

    if (movieId) {
        fetchMovieDetails(movieId);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('searchQuery'); 
    const searchInput = document.querySelector('#searchInput');
    if (searchInput) searchInput.value = ''; 
});

export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

export function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

document.addEventListener('DOMContentLoaded', showFavorites);


