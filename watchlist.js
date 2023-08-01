let receivedMovie = JSON.parse(localStorage.getItem('movieData')) || []
const info = document.getElementById('info')

function renderMovie() {
    let html = ''
    receivedMovie.forEach(data => {
        html += `
        <div class='movie-content'>
     <img class='poster-img' src='${data.Poster}'>
    <div class='movie-info'>
        <div class='basic-info'>
            <h2 class='title'>${data.Title}</h2>
            <p class='year'>${data.Year}</p>  
            <p class='rating'>⭐${data.imdbRating}</p>
        </div>
        <div class='plus-info'>
            <p class='run-time'>${data.Runtime}</p>
            <p class='genre'>${data.Genre}</p>
    <button onclick='removeMovie("${data.imdbID}")' class='btn-whishlist'><i class="fa-sharp fa-solid fa-circle-minus" style="color: #ffffff;"></i> Remove</button>
    </div>
        <p class='plot'>${data.Plot}</p>
    </div>
    </div>
    `
 })
    
    document.getElementById('film-container').innerHTML = html
}

renderMovie()

function removeMovie(id) {
 const remove = receivedMovie.findIndex(movie => movie.imdbID === id)
  if (remove !== -1) {
    receivedMovie.splice(remove, 1)
    localStorage.setItem('movieData', JSON.stringify(receivedMovie))
    renderMovie()
    info.style.display = 'flex'
  }
}






