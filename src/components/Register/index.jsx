import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"

import "../Login/style.scss"

function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    function handleChange(event) {
        const value = event.target.value
        const target = event.target.name

        if (target === 'name')
            setName(value)
        else if (target === 'email')
            setEmail(value)
        else setPassword(value)
    }

    function handleSubmit() {
        event.preventDefault();
        console.log({ name, email, password })
        axios.post("http://localhost:3000/api/auth/register",
            { name, email, password }).then(res => {

                var { connected, error, user } = res.data
                user = user[0]

                console.log(res.data)

                if (error !== null)
                    console.log(error)
                if (connected === true) {
                    localStorage.clear()
                    localStorage.setItem('token', user._id)
                    localStorage.setItem('infos', [user.name, user.email, user.isManager])
                }
            })
    }

    return (
        <div className="login-container">
            <h1 className="title">Register</h1>
            <div className="form-group">
                <label htmlFor="name">Name :</label>
                <input type="text" name="name" value={name} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email :</label>
                <input type="email" name="email" value={email} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password :</label>
                <input type="password" name="password" value={password} onChange={handleChange} required />
            </div>
            <button onClick={handleSubmit}>Register</button>

            <div className="register-link">
                <p>Have already an account? <Link to="/login">Sign in</Link></p>
            </div>
        </div>
    );
}

export default Register;
