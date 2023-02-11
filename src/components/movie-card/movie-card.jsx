import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHeart, FaTrashAlt } from "react-icons/fa";

import "./movie-card.scss";

const MovieCard = ({ movie }) => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteMovies, setFavoriteMovies] = useState(storedUser.FavoriteMovies ? storedUser.FavoriteMovies : []);

    const addFavMovie = () => {
        fetch(`https://myflix-by-mikkobelly.herokuapp.com/users/${storedUser.Username}/movies/${movie._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedToken}`
            }
        }).then(res => res.json())
            .then((data) => {
                if (data) {
                    setFavoriteMovies(data.FavoriteMovies);
                    localStorage.setItem("user", JSON.stringify(data))
                    alert("Added to Favorite movies!")
                    window.location.reload();
                } else {
                    alert("somethng went wrong")
                }
            }).catch(err => console.log(err));
    };

    const deleteFavMovie = () => {
        fetch(`https://myflix-by-mikkobelly.herokuapp.com/users/${storedUser.Username}/movies/${movie._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedToken}`
            }
        }).then(res => res.json())
            .then((data) => {
                if (data) {
                    setFavoriteMovies(favoriteMovies.filter((favM) => favM !== movie._id));
                    localStorage.setItem("user", JSON.stringify(data))
                    alert("Deleted from Favorite movies")
                    window.location.reload();
                } else {
                    alert("somethng went wrong")
                }
            }).catch(err => console.log(err));
    }

    const toggleMovie = () => {
        const favoriteMoviesValues = Object.values(favoriteMovies);
        favoriteMoviesValues.some(favM => favM === movie._id) ? setIsFavorite(true) : setFavoriteMovies(false);
    }

    useEffect(() => {
        toggleMovie();
    }, [])


    return (
        <Card border="light" className="h-100 bg-light bg-opacity-75 shadow">
            <Card.Img className="mb-3" variant="top" src={movie.ImagePath} />
            <Card.Body className="text-center card__body">
                <div className="card__body-inner">
                    <Card.Title className="mb-4">{movie.Title}</Card.Title>
                    <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                        <Button variant="outline-success">See details</Button>
                    </Link>
                </div>
                <div>
                    {!isFavorite &&
                        <button onClick={addFavMovie} variant="light" className="button_movie-toggle">
                            <FaHeart className="icon icon--add" />
                        </button>}
                    {isFavorite &&
                        <button onClick={deleteFavMovie} variant="light" className="button_movie-toggle">
                            <FaTrashAlt className="icon icon--delete" />
                        </button>
                    }
                </div>
            </Card.Body>
        </Card>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired
        }),
        ImagePath: PropTypes.string.isRequired,
    }).isRequired
};

export default MovieCard;
