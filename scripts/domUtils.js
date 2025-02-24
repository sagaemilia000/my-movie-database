// import { fetchMovieDetails } from "./api.js";

export function moviesToList(movies) {
    const movieContainer = document.querySelector('#cardContainer')
    
    movies.forEach(movie => {
        let movieElem = document.createElement('article')
        movieElem.classList.add('movie-card')

        let starIcon = document.createElement('span')
        starIcon.classList.add('material-symbols-outlined')
        starIcon.textContent = 'star'
        starIcon.addEventListener('click', () => fillStar(starIcon));

        let title = document.createElement('h3')
        title.classList.add('movie-title')
        title.textContent = movie.Title;

        let poster = document.createElement('img')
        poster.src = movie.Poster;
        poster.alt = `${movie.Title} poster`

        movieElem.appendChild(title)
        movieElem.appendChild(poster)
        movieElem.appendChild(starIcon)

        movieContainer.appendChild(movieElem)

        title.addEventListener('click', () => {
            
            localStorage.setItem('selectedMovieId', movie.imdbID);
            window.location.href = '/movie.html';
            // fetchMovieDetails()
            
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
        starIcon.addEventListener('click', () => fillStar(starIcon));

        let title = document.createElement('h3');
        title.classList.add('movie-title');
        title.textContent = movie.Title;

        let poster = document.createElement('img');
        poster.src = movie.Poster;
        poster.alt = `${movie.Title} poster`;

        if (movie.Poster === 'N/A') {
            poster.src = "./res/icons/missing-poster.svg";  
            poster.alt = "Ingen bild tillgänglig";
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

    //Poster

    let posterElement = document.createElement('img')
    posterElement.src = detailsData.Poster
    posterElement.classList.add('movie-poster')

    let starIcon = document.createElement('span')
        starIcon.classList.add('material-symbols-outlined')
        starIcon.style.position = 'sticky'
        starIcon.style.width = '2rem'
        starIcon.style.alignSelf = 'flex-end'
        starIcon.textContent = 'star'
        starIcon.addEventListener('click', () => fillStar(starIcon));

    //Title
    let titleElement = document.createElement('h1');
    titleElement.textContent = detailsData.Title;
    titleElement.classList.add('movie-title-info')

    //List
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

    //Plot

    let plotElement = document.createElement('p')
    plotElement.classList.add('plot-text')
    plotElement.textContent = `${detailsData.Plot}`

    //More details
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
}



function fillStar(starIcon) {
    let starFilled = starIcon.classList.toggle('filled')

            if (starFilled) {
            starIcon.style.fontVariationSettings = "'FILL' 1"
            } else {
        starIcon.style.fontVariationSettings = "'FILL' 0"
        }
}

