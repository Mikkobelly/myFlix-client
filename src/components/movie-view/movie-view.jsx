import React from 'react'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const MovieView = ({ movie, onBackClick }) => {
    return (
        <>
            {/* <div className="text-center mb-3">
                <img src={movie.ImagePath} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <Button variant="outline-secondary" onClick={onBackClick}>Back</Button> */}

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
                    <Button className="mt-3" variant="outline-secondary" onClick={onBackClick}>Back</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default MovieView
