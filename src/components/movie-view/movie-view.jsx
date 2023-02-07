import React from 'react'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";

const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find(movie => movie._id === movieId);

    return (
        <>
            <Card border="light">
                <Card.Img className="mb-3" variant="top" src={movie.ImagePath} />
                <Card.Body className="p-3 p-md-5">
                    <Card.Title className="mb-3 fw-bold fs-2">{movie.Title}</Card.Title>
                    <Card.Text>
                        <span className="me-1 fw-semibold">Description: </span>
                        <span>{movie.Description}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="me-1 fw-semibold">Genre: </span>
                        <span>{movie.Genre.Name}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="me-1 fw-semibold">Director: </span>
                        <span>{movie.Director.Name}</span>
                    </Card.Text>
                    <Link to={`/`}>
                        <Button className="mt-3" variant="outline-secondary">Back</Button>
                    </Link>
                </Card.Body>
            </Card>
        </>
    )
}

export default MovieView
