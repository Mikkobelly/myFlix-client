import React from "react";
import { useState } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";

const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Silence Of Lambs",
            description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
            genre: "Thriller",
            director: "Jonathan Demme",
            image: "https://m.media-amazon.com/images/I/51SHYSFNP2L._AC_.jpg"
        },
        {
            id: 2,
            title: "The Dark Knight",
            description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            genre: "Crime",
            director: "Christopher Nolan",
            image: "https://m.media-amazon.com/images/I/516JxYYnE8L._AC_.jpg"
        },
        {
            id: 3,
            title: "Inception",
            description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
            genre: "Action",
            director: "Christopher Nolan",
            image: "https://m.media-amazon.com/images/I/51C6DPWQwgL._AC_.jpg"
        }
    ])

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return <MovieView movie={selectedMovie} onBackClick={() => { return setSelectedMovie(null); }} />
    }

    if (movies.length === 0) {
        return <div>Movie list is empty!</div>
    }


    return <>
        {movies.map((movie) => {
            return <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={newSelectedMovie => { return setSelectedMovie(newSelectedMovie); }}
            />
        })}
    </>
}

export default MainView;