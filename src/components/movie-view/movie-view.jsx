import React from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import MovieCard from '../movie-card/movie-card';

const MovieView = ({ movies, findSimilarMovies }) => {
    const { movieId } = useParams();
    const movie = movies.find(movie => movie._id === movieId);
    const similarMovies = findSimilarMovies(movie);

    return (
        <>
            <Row>
                <Col md={4}>
                    <img className="w-100" variant="top" src={movie.ImagePath} />
                </Col>
                <Col md={8}>
                    <Card border="light" className="bg-light bg-opacity-75 shadow">
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
                                <Link to={`/movies/director/${encodeURIComponent(movie.Director.Name)}`}>
                                    <Button variant="link">
                                        {movie.Director.Name}
                                    </Button>
                                </Link>
                            </Card.Text>
                            <Link to={`/`}>
                                <Button className="mt-3" variant="outline-secondary">Back</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


            <Row>
                <h2 className="my-3 my-md-5">Similar Movies: </h2>
                {similarMovies.map((movie) => (
                    <Col md={6} lg={4} key={movie._id} className="mb-3">
                        <MovieCard movie={movie} />
                    </Col>
                ))}
            </Row>

        </>
    )
}

export default MovieView
