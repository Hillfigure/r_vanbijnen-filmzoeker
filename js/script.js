const mainContent = document.querySelector("main")

// EVENT LISTENERS HERE

const radioButtons = document.querySelectorAll(".radio-button")
radioButtons.forEach(e => {
    e.addEventListener("click", (function() {
        while(mainContent.firstChild) {
            mainContent.removeChild(mainContent.lastChild);
        }
        displayMovies(movies, e.firstElementChild.value, e.firstElementChild.id);
    }))
})

const searchField = document.getElementById("search-field");
searchField.addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
        while(mainContent.firstChild) {
            mainContent.removeChild(mainContent.lastChild);
        }
        displayMovies(movies, "field", searchField.value.toLowerCase());
    }
})

// FILTER FUNCTIONS

const filterFranchise = (array, franchise) => {
    return array.filter(item => item.Title.includes(franchise))
}

const filterLatest = (array) => {
    return array.filter(item => item.Year > 2013)
}

const filterSearchField = (array, searchValue) => {
    return array.filter(item => item.Title.toLowerCase().includes(searchValue))
}

const filterMovies = (array, searchRequestCode, franchise) => {
    switch(searchRequestCode){
        case "fran": return filterFranchise(array, franchise); 
        case "latest": return filterLatest(array);
        case "field": return filterSearchField(array, franchise);
        case "all": return array;
        default: console.log("No movie was found");
            break;
    }
}

// MAIN DISPLAY FUNCTION

const displayMovies = (movies, searchCode, franchiseType) => {
    const filteredMovies = filterMovies(movies, searchCode, franchiseType);
    filteredMovies.forEach(e => {
        const movieLinkWrapper = document.createElement("a");
        mainContent.appendChild(movieLinkWrapper).setAttribute("href", "https://www.imdb.com/title/" + e.imdbID);
        const movieDiv = document.createElement("img");
        movieDiv.classList.add("movie-item");
        movieDiv.setAttribute("src", e.Poster);
        movieLinkWrapper.appendChild(movieDiv).setAttribute("alt", e.Title);
    });
}

displayMovies(movies, "latest");