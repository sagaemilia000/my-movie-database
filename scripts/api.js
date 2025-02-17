import oData from '../data/data.js';
import { moviesToList } from "/scripts/domUtils.js";

export async function fetchTopMovies() {
    const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
    let movies = await response.json();
    oData.topMovieList = movies;

    let top20Movies = movies.slice(0, 20);

    moviesToList(top20Movies)
    console.log(top20Movies);
}

// export async function moviesToList(movies) {
//     const movieContainer = document.querySelector('#cardContainer')
    
//     movies.forEach(movie => {
//         let movieElem = document.createElement('article')
//         movieElem.classList.add('movie-card')

//         let title = document.createElement('h3')
//         title.classList.add('movie-title')
//         title.textContent = movie.Title;

//         let poster = document.createElement('img')
//         poster.src = movie.Poster;
//         poster.alt = `${movie.title} poster`

//         movieElem.appendChild(title)
//         movieElem.appendChild(poster)

//         movieContainer.appendChild(movieElem)
//     });
// }

// export async function fetchMovieDetails() {
//     const response = await fetch('http://www.omdbapi.com/?apikey=6fcInZYueqWcXc8nddQPeJdpbVEPGEFYB6QFeNFn&s=batman')
//     let data = await response.json();
//     console.log(data) 
// }
