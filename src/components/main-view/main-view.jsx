import React, { useEffect, useState } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";

const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://myflix-by-mikkobelly.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(movies => setMovies(movies))
            .catch(err => console.log(err));
    }, [token]);

    if (!user) {
        return <>
            <h2>Login</h2>
            <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
            or
            <h2>Sign up</h2>
            <SignupView />
        </>
    }

    if (selectedMovie) {
        let similarMovies = movies.filter((movie) => movie.Genre.Name === selectedMovie.Genre.Name && movie !== selectedMovie);
        return <>
            <MovieView movie={selectedMovie} onBackClick={() => { return setSelectedMovie(null); }} />
            <hr></hr>
            <h2>Similar Movies:</h2>
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
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </>
}

export default MainView;