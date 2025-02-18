export function moviesToList(movies) {
    const movieContainer = document.querySelector('#cardContainer')
    
    movies.forEach(movie => {
        let movieElem = document.createElement('article')
        movieElem.classList.add('movie-card')

        let title = document.createElement('h3')
        title.classList.add('movie-title')
        title.textContent = movie.Title;

        let poster = document.createElement('img')
        poster.src = movie.Poster;
        poster.alt = `${movie.Title} poster`

        movieElem.appendChild(title)
        movieElem.appendChild(poster)

        movieContainer.appendChild(movieElem)
    });
}

export function randomTrailers(movieList, count = 5) {
    return movieList
    .sort(() => Math.random() - 0.5) 
    .slice(0, count); 
}

export function searchedMovieResult(movies) {
    console.log(movies);
    const resultContainer = document.querySelector('#searchContainer'); 
    resultContainer.innerHTML = ''; 

    movies.forEach(movie => {
        let movieElement = document.createElement('article');
        movieElement.classList.add('movie-card');

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

        resultContainer.appendChild(movieElement);
    });

}