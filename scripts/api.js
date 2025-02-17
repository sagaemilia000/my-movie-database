import oData from '../data/data.js';
import { moviesToList, randomTrailers } from "/scripts/domUtils.js";
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
