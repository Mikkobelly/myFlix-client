import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            Username: username,
            Password: password
        }

        fetch("https://myflix-by-mikkobelly.herokuapp.com/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => res.json())
            .then((data) => {
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            }).catch((err) => {
                console.log(err);
                alert("Something went wrong");
            });

    }

    return (
        <>
            <h1 className="text-center">Welcome Back</h1>
            <Form onSubmit={handleSubmit} className="p-4 bg-light bg-opacity-75 rounded my-5">
                <Form.Text className="fw-bold fs-2 text-uppercase text-dark">Login</Form.Text>
                <Form.Group className="my-3" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control className="bg-light" type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control className="bg-light" type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </Form.Group>
                <Button type="submit" variant="success">Login</Button>
            </Form>
        </>
    )
}

export default LoginView;
