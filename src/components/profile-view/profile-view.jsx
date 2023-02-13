import React, { useState } from "react";
import MovieCard from '../movie-card/movie-card';
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";

const ProfileView = ({ user, movies, favMovies, onLoggedIn, onLoggedOut }) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const [open, setOpen] = useState(false);

    const storedToken = localStorage.getItem("token");
    let favMoviesData = movies.filter(m => favMovies.includes(m._id));
    let parsedBirthday;
    for (let i = 0; i < user.Birthday.length; i++) {
        if (user.Birthday[i] === 'T') {
            parsedBirthday = user.Birthday.slice(0, i);
        }
    }

    const handleDeregisterSubmit = (e) => {
        e.preventDefault();

        fetch(`https://myflix-by-mikkobelly.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedToken}`
            }
        }).then((res) => {
            if (res.ok) {
                alert(`${user.Username} deregistered`);
                onLoggedOut();
                window.location.reload();
            } else {
                alert("Something went wrong. Please try again.")
            }
        }).catch(err => console.log(err));
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://myflix-by-mikkobelly.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedToken}`
            }
        }).then((res) => res.json())
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data));
                onLoggedIn(data.user);
                alert("Profile updated succesfully");
                window.location.reload();
            }).catch((err) => {
                console.log(err);
                alert("Something went wrong");
            });
    };


    return (
        <>
            <Card border="light" className="bg-light bg-opacity-75">
                <Card.Body className="p-3 p-md-5">
                    <Card.Title className="mb-3 fw-bold fs-2">
                        {user.Username}
                        <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="collapse-form"
                            aria-expanded={open}
                            variant="warning"
                            className="text-white ms-4"
                        >
                            Edit Profile
                        </Button>
                    </Card.Title>
                    <Card.Text>
                        <span className="me-1 fw-semibold">Email: </span>
                        <span>{user.Email}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="me-1 fw-semibold">Birthday: </span>
                        <span>{parsedBirthday}</span>
                    </Card.Text>

                    <Collapse in={open}>
                        <div id="collapse-form">
                            <Form onSubmit={handleEditSubmit} className="p-4 bg-light bg-opacity-75 rounded">
                                <Form.Text className="fw-bold fs-2 text-uppercase text-dark mb-3">Edit</Form.Text>
                                <Form.Group className="my-3" controlId="formUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control className="bg-light" type="text" placeholder={user.Username} value={username} onChange={e => setUsername(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control className="bg-light" type="password" placeholder="new password" value={password} onChange={e => setPassword(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control className="bg-light" type="email" placeholder={user.Email} value={email} onChange={e => setEmail(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Birthday:</Form.Label>
                                    <Form.Control className="bg-light" type="date" value={birthday} onChange={e => setBirthday(e.target.value)} required />
                                </Form.Group>
                                <Button type="submit" variant="success">Submit</Button>
                            </Form>
                        </div>
                    </Collapse>

                    <Form onSubmit={handleDeregisterSubmit}>
                        <Button type="submit" className="mt-3" variant="outline-danger" size="sm">Deregister</Button>
                    </Form>
                </Card.Body>
            </Card>

            <Row>
                <h2 className="my-3 my-md-5">Favorite Movies: </h2>
                {favMoviesData.map((movie) => (
                    <Col md={6} lg={4} key={movie._id} className="mb-3">
                        <MovieCard movie={movie} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default ProfileView;
