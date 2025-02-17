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
        poster.alt = `${movie.title} poster`

        movieElem.appendChild(title)
        movieElem.appendChild(poster)

        movieContainer.appendChild(movieElem)
    });
}