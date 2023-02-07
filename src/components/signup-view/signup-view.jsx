import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://myflix-by-mikkobelly.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.ok) {
                alert("Signup successfull");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-5 p-4 bg-light bg-opacity-75 rounded">
            <Form.Text className="fw-bold fs-2 text-uppercase text-dark mb-3">Signup</Form.Text>
            <Form.Group className="my-3" controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control className="bg-light" type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} required minLength="5" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control className="bg-light" type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control className="bg-light" type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control className="bg-light" type="date" placeholder="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} required />
            </Form.Group>
            <Button type="submit" variant="success">Submit</Button>
        </Form>
    )
}

export default SignupView;
