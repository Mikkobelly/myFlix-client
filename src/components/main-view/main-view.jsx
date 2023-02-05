import React, { useEffect, useState } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";

const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://myflix-by-mikkobelly.herokuapp.com/movies")
            .then(res => res.json())
            .then((movies) => {
                const moviesFromApi = movies.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.Title,
                        description: movie.Description,
                        genre: movie.Genre.Name,
                        director: movie.Director.Name,
                        image: movie.ImagePath
                    };
                });

                setMovies(moviesFromApi);
            })
            .catch(err => console.log(err));
    }, []);

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