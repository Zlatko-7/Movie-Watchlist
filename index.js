const movieSrc = document.getElementById('movie-src')
const searchBtn = document.getElementById('search-btn')
const movieContainer = document.getElementById('movie-container')
let movieArray = []
let watchlistArray = []

function getMovieHtml() {
      const yourMovie = movieSrc.value
fetch(`https://www.omdbapi.com/?apikey=ca6f7f3c&s=${yourMovie}`)
        .then(res => res.json())
        .then(data =>{ 
      const newSearch = data.Search
newSearch.forEach(movie => {
      const title = movie.Title
fetch(`https://www.omdbapi.com/?apikey=ca6f7f3c&t=${title}`)
        .then(res => res.json())
        .then(data => {
    let html = `
    <div class='movie-content'>
     <img class='poster-img' src='${data.Poster}'>
    <div class='movie-info'>
        <div class='basic-info'>
            <h2 class='title'>${title}</h2>
            <p class='year'>${data.Year}</p>  
            <p class='rating'>⭐${data.imdbRating}</p>
        </div>
        <div class='plus-info'>
            <p class='run-time'>${data.Runtime}</p>
            <p class='genre'>${data.Genre}</p>
    <button onclick='addMovie("${data.imdbID}")' class='btn-whishlist'><i class="fa-sharp fa-solid fa-circle-plus" style="color: #ffffff;"></i></button>
    <p class='watchlist' data-movie-id="${data.imdbID}">Watchlist</p>
    </div>
        <p class='plot'>${data.Plot}</p>
    </div>
    </div>
    `
        movieArray.push(data)
        document.getElementById('logo').style.display = 'none'
        movieContainer.innerHTML += html
        })
     })
  })
}

function addMovie(id) {
  const movieAdd = movieArray.find(film => film.imdbID === id)
    if(movieAdd) {
        watchlistArray.push(movieAdd)
        localStorage.setItem('movieData', JSON.stringify(watchlistArray))
    }
     const watchlistChange = document.querySelector(`p[data-movie-id='${id}']`)
    if (watchlistChange) {
      watchlistChange.textContent = 'Added'
      watchlistChange.style.color = 'green'
      watchlistChange.style.fontWeight = 'bold'
    }
  }



searchBtn.addEventListener('click', getMovieHtml)