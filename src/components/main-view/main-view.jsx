import React, { useEffect, useState } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"

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

    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8}>
                    <MovieView movie={selectedMovie} onBackClick={() => { return setSelectedMovie(null); }} />
                </Col>
            ) : movies.length === 0 ? (
                <div>Movie list is empty!</div>
            ) : (
                <>
                    {movies.map((movie) =>
                        <Col md={3} key={movie._id} className="mb-5">
                            <MovieCard
                                movie={movie}
                                onMovieClick={newSelectedMovie => { return setSelectedMovie(newSelectedMovie); }}
                            />
                        </Col>
                    )}
                    <Col md={10} className="text-center">
                        <Button className="text-light" variant="danger" size="lg" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
                    </Col>
                </>
            )}
        </Row>
    )
}

export default MainView;