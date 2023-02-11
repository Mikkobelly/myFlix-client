import React from "react";
import MovieCard from "../movie-card/movie-card";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const DirectorView = ({ movies, findDirector, findDirectorMovies }) => {
    const { directorName } = useParams();
    const director = findDirector(movies, directorName);
    const movie = movies.find(m => m.Director.Name === directorName);
    const directorMovies = findDirectorMovies(movies, movie, directorName);
    return (
        <>
            <Card border="light" className="bg-light bg-opacity-75 shadow">
                <Card.Body className="p-3 p-md-5">
                    <Card.Title className="mb-3 fw-bold fs-2">{director.Name}</Card.Title>
                    <Card.Text>
                        <span className="me-1 fw-semibold">Birth: </span>
                        <span>{director.Birth}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="me-1 fw-semibold">Death: </span>
                        <span>{director.Death}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="me-1 fw-semibold">Bio: </span>
                        <span>{director.Bio}</span>
                    </Card.Text>
                    <Link to={`/`}>
                        <Button className="mt-3" variant="outline-secondary">Back to Home</Button>
                    </Link>
                </Card.Body>
            </Card>

            <Row>
                <h2 className="my-3 my-md-5">Movies from {director.Name}:</h2>
                {directorMovies.map((movie) => (
                    <Col md={6} lg={4} key={movie._id} className="mb-3">
                        <MovieCard movie={movie} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default DirectorView;
