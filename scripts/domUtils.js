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
        let movieElement = document.createElement('article');
        movieElement.classList.add('movie-card');

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

        movieElement.appendChild(title);
        movieElement.appendChild(poster);
        movieElement.appendChild(starIcon)

        resultContainer.appendChild(movieElement);
    });

}

function fillStar(starIcon) {
    let starFilled = starIcon.classList.toggle('filled')

            if (starFilled) {
            starIcon.style.fontVariationSettings = "'FILL' 1"
            } else {
        starIcon.style.fontVariationSettings = "'FILL' 0"
        }
}

