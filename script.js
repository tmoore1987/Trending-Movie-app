const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const form = document.getElementById('form');
const search = document.getElementById('search');
const content = document.getElementById('content');


//A function to fetch movies from API and returns the results using fetch 
// function.The results will be passed to showMovies() function.

getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}

// A function to showcase the results in the browser which basically inserts 
// the HTML code dynamically.The data to this function is passed from the getMovies() function.

const showMovies = (movies) => {
    content.innerHTML = '';

    movies.forEach((movie) => {
        const {poster_path, title, vote_average, overview} = movie;

        const movieE1 = document.createElement('div');
        movieE1.classList.add('movie');

        movieE1.innerHTML = `
        <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
            
        `;

        content.appendChild(movieE1);
    })

}

// A function which returns the color based on movie rating obtained 
// from API. This color is used in CSS to choose the color of the movie rating text.

const getClassByRate = (vote) => {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5 ) {
        return 'orange';
    } else {
        return 'red';
    };

}

form.addEventListener('submit', (e) => {
    e.preventDefault() ;

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = ''
    };
})