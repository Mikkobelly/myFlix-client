import React, { useEffect, useState } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";

const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://myflix-by-mikkobelly.herokuapp.com/movies")
            .then(res => res.json())
            .then(movies => setMovies(movies))
            .catch(err => console.log(err));
    }, []);

    if (selectedMovie) {
        let similarMovies = movies.filter((movie) => movie.Genre.Name === selectedMovie.Genre.Name && movie !== selectedMovie);
        return <>
            <MovieView movie={selectedMovie} onBackClick={() => { return setSelectedMovie(null); }} />
            <hr></hr>
            <h2>Similar movies:</h2>
            {similarMovies.map((movie) => {
                return <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={newSelectedMovie => setSelectedMovie(newSelectedMovie)}
                />
            })}
        </>
    }

    if (movies.length === 0) {
        return <div>Movie list is empty!</div>
    }


    return <>
        {movies.map((movie) => {
            return <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={newSelectedMovie => { return setSelectedMovie(newSelectedMovie); }}
            />
        })}
    </>
}

export default MainView;