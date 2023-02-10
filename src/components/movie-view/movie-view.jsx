import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import MovieCard from '../movie-card/movie-card';

const MovieView = ({ movies, findSimilarMovies }) => {
    const { movieId } = useParams();
    const movie = movies.find(movie => movie._id === movieId);
    const similarMovies = findSimilarMovies(movie);

    return (
        <>
            <Card border="light" className="bg-light bg-opacity-75 shadow">
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

            <Container>
                <Row>
                    <h2 className="my-3 my-md-5">Similar Movies: </h2>
                    {similarMovies.map((movie) => (
                        <Col md={6} lg={4} key={movie._id} className="mb-3">
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default MovieView
