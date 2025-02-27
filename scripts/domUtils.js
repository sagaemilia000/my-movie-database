import { getFavorites, saveFavorites } from "./api.js";

export function moviesToList(movies) {
    let movieContainer = document.querySelector('#cardContainer')
    let favorites = getFavorites();

    if(movieContainer) {
        movieContainer.innerHTML = ''
    }else {
        return;
    }
    
    movies.forEach(movie => {
        let movieElem = document.createElement('article')
        movieElem.classList.add('movie-card')

        let starIcon = document.createElement('span')
        starIcon.classList.add('material-symbols-outlined')
        starIcon.textContent = 'star'

        let isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
        starIcon.style.fontVariationSettings = isFavorite ? "'FILL' 1" : "'FILL' 0";

        starIcon.addEventListener('click', () => fillStar(starIcon, movie));

        let title = document.createElement('h3')
        title.classList.add('movie-title')
        title.textContent = movie.Title;

        let poster = document.createElement('img')
        poster.alt = `${movie.Title} poster`;
       
        if (movie.Poster === 'N/A') {
            poster.src = "./res/icons/missing-poster.svg";  
        } else {
            poster.src = movie.Poster;
        }

        movieElem.appendChild(title)
        movieElem.appendChild(poster)
        movieElem.appendChild(starIcon)

        movieContainer.appendChild(movieElem)

        title.addEventListener('click', () => {
            
            localStorage.setItem('selectedMovieId', movie.imdbID);
            window.location.href = '/movie.html';
            
        })
    });
}

export function randomTrailers(movieList, count = 5) {
    return movieList
    .sort(() => Math.random() - 0.5) 
    .slice(0, count); 
}

export function searchedMovieResult(movies) {
    const resultContainer = document.querySelector('#searchContainer'); 
    resultContainer.innerHTML = ''; 

    movies.forEach(movie => {
        let movieElem = document.createElement('article');
        movieElem.classList.add('movie-card');

        let starIcon = document.createElement('span')
        starIcon.classList.add('material-symbols-outlined')
        starIcon.textContent = 'star'

        let favorites = getFavorites();
        let isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
        starIcon.style.fontVariationSettings = isFavorite ? "'FILL' 1" : "'FILL' 0";
        

        starIcon.addEventListener('click', () => fillStar(starIcon, movie));

        let title = document.createElement('h3');
        title.classList.add('movie-title');
        title.textContent = movie.Title;

        let poster = document.createElement('img');
        poster.alt = `${movie.Title} poster`;

        if (movie.Poster === 'N/A') {
            poster.src = "./res/icons/missing-poster.svg";  
        } else {
            poster.src = movie.Poster;
        }

        movieElem.appendChild(title);
        movieElem.appendChild(poster);
        movieElem.appendChild(starIcon)

        resultContainer.appendChild(movieElem);

        title.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.setItem('selectedMovieId', movie.imdbID);
            window.location.href = '/movie.html';
        })
    });

}

export function movieDetailsToDom(detailsData) {
    let movieInfoPage = document.querySelector('#movieInformation')
    
    movieInfoPage.innerHTML = '';

    let infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container');

    let posterElement = document.createElement('img')
    posterElement.classList.add('missing-poster')
    posterElement.alt = `${detailsData.Title} poster`;
    
    if (detailsData.Poster === 'N/A') {
        posterElement.src = "./res/icons/missing-poster.svg";  
    } else {
        posterElement.src = detailsData.Poster;
    }

    let starIcon = document.createElement('span')
        starIcon.classList.add('material-symbols-outlined')
        starIcon.style.position = 'sticky'
        starIcon.style.width = '2rem'
        starIcon.style.alignSelf = 'flex-end'
        starIcon.textContent = 'star'

        let favorites = getFavorites();
        let isFavorite = favorites.some(fav => fav.imdbID === detailsData.imdbID);
        starIcon.style.fontVariationSettings = isFavorite ? "'FILL' 1" : "'FILL' 0";
    
        starIcon.addEventListener('click', () => fillStar(starIcon, detailsData));

    let titleElement = document.createElement('h1');
    titleElement.textContent = detailsData.Title;
    titleElement.classList.add('movie-title-info')

    let infoList = document.createElement('ul')
    infoList.classList.add('info-list')
    movieInfoPage.appendChild(infoList)

    let ratedElement = document.createElement('li')
    ratedElement.textContent = `Rated: ${detailsData.Rated}`

    let genreElement = document.createElement('li')
    genreElement.textContent = `Genre: ${detailsData.Genre}`

    let runtimeElement = document.createElement('li')
    runtimeElement.textContent = `Runtime: ${detailsData.Runtime}`

    let releasedElement = document.createElement('li')
    releasedElement.textContent = `Released: ${detailsData.Released}`

    let ratingsElement = document.createElement('li')
    ratingsElement.textContent = `Ratings: ${detailsData.imdbRating}/10`

    let plotElement = document.createElement('p')
    plotElement.classList.add('plot-text')
    plotElement.textContent = `${detailsData.Plot}`

    let infoListTwo = document.createElement('ul')
    infoListTwo.classList.add('info-list')
    movieInfoPage.appendChild(infoListTwo)

    let directorElement = document.createElement('li')
    directorElement.textContent = `Director: ${detailsData.Director}`

    let writerElement = document.createElement('li')
    writerElement.textContent = `Writer: ${detailsData.Writer}`

    let actorsElement = document.createElement('li')
    actorsElement.textContent = `Actors: ${detailsData.Actors}`
    

    infoContainer.appendChild(posterElement);
    let detailsContainer = document.createElement('div')
    detailsContainer.classList.add('details-container')
    
    detailsContainer.appendChild(starIcon)
    detailsContainer.appendChild(titleElement);
    detailsContainer.appendChild(infoList);
    detailsContainer.appendChild(plotElement);
    detailsContainer.appendChild(infoListTwo);

    infoContainer.appendChild(detailsContainer);

    movieInfoPage.appendChild(infoContainer)

    infoList.appendChild(ratedElement);
    infoList.appendChild(genreElement);
    infoList.appendChild(runtimeElement);
    infoList.appendChild(releasedElement);
    infoList.appendChild(ratingsElement);

    infoListTwo.appendChild(directorElement)
    infoListTwo.appendChild(writerElement)
    infoListTwo.appendChild(actorsElement)
};


function fillStar(starIcon, movie) {
    let favorites = getFavorites();
    let movieId = movie.imdbID;

    let index = favorites.findIndex(fav => fav.imdbID === movieId);

    if (index === -1) {
        favorites.push(movie); 
        starIcon.style.fontVariationSettings = "'FILL' 1"; 
    } else {
        favorites.splice(index, 1); 
        starIcon.style.fontVariationSettings = "'FILL' 0"; 
    }

    saveFavorites(favorites);
};


export function showFavorites() {
    const favorites = getFavorites();
    let movieContainer = document.querySelector('#cardContainer');
    const emptyFav = document.querySelector('#emptyFav');

    if (movieContainer) {
        movieContainer.innerHTML = '';
    }

    if (favorites.length === 0) {
        if (emptyFav) {
            emptyFav.textContent = 'No favorites yet';
            emptyFav.style.display = 'block';
        }
        return; 
    } else if (emptyFav) {
        emptyFav.style.display = 'none'; 
    }

    moviesToList(favorites);
};




