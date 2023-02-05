import React, { useState } from 'react'

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
                console.log(data);
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
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} required minLength="5" />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginView;
