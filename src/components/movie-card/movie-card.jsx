import React from 'react';
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
    return (
        <Card border="light" className="h-100">
            <Card.Img className="mb-3" variant="top" src={movie.ImagePath} />
            <Card.Body className="text-center">
                <Card.Title className="mb-3">{movie.Title}</Card.Title>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant="outline-success">See details</Button>
                </Link>
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
