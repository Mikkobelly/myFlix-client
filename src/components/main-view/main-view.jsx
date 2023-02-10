import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import ProfileView from "../profile-view/profile-view";
import NavigationBar from "../navigation-bar/navigation-bar";
import { Row, Col, Form } from "react-bootstrap";


const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [typedChar, setTypedChar] = useState("");
    const [searchedMovies, setSearchedMovies] = useState([]);

    const findSimilarMovies = (movie) => {
        return movies.filter((m) => m.Genre.Name === movie.Genre.Name && m !== movie);
    }

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://myflix-by-mikkobelly.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.json())
            .then(movies => {
                if (typedChar && typedChar.length > 0) {
                    const searchedMoviesData = movies.filter(m => m.Title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(typedChar));
                    setSearchedMovies(searchedMoviesData);
                } else {
                    setSearchedMovies([]);
                    setMovies(movies);
                }
            })
            .catch(err => console.log(err));
    }, [token, typedChar]);

    return (
        <BrowserRouter>
            <NavigationBar user={user} onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }} />

            <Row className="justify-content-md-center mx-auto my-3 my-md-5">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={6}>
                                        <SignupView />
                                    </Col>
                                )
                                }
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={6}>
                                        <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
                                    </Col>
                                )
                                }
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} findSimilarMovies={findSimilarMovies} />
                                    </Col>
                                )
                                }
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <ProfileView
                                            user={user}
                                            movies={movies}
                                            favMovies={storedUser.FavoriteMovies}
                                            onLoggedIn={(user, token) => { setUser(user); setToken(token) }}
                                            onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                <Row className="justify-content-md-center m-0">
                                    <Col md={6} lg={4} className="mb-3 mb-md-5">
                                        <Form>
                                            <Form.Control
                                                type="text"
                                                placeholder="Search Movies"
                                                value={typedChar}
                                                onChange={e => setTypedChar(e.target.value)}
                                                className="bg-light shadow-sm"
                                            />
                                        </Form>

                                    </Col>
                                </Row>

                                {!user ? (
                                    <Navigate to="/login" />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {searchedMovies && searchedMovies.length > 0 ? (
                                            searchedMovies.map((movie) =>
                                                <Col md={4} lg={3} key={movie._id} className="mb-5">
                                                    <MovieCard movie={movie} />
                                                </Col>
                                            )
                                        ) : (
                                            movies.map((movie) =>
                                                <Col md={4} lg={3} key={movie._id} className="mb-5">
                                                    <MovieCard movie={movie} />
                                                </Col>
                                            )
                                        )}
                                    </>
                                )
                                }
                            </>
                        }
                    />
                </Routes>
            </Row>

            <footer>
                <p className="text-center text-muted py-5">&copy; Miki Akuta 2023</p>
            </footer>
        </BrowserRouter>
    );
};

export default MainView;