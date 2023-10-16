
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });


    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login");

        console.log(`Email: ${credentials.email}`);
        console.log(`Password: ${credentials.password}`)

        // assume email and password are valid
        
        navigate('/home');

        // console.log(data);
    };
    return (
        <>
            <h1>Login Page</h1>

            <form action="" onSubmit={handleLogin}>
                <label htmlFor="">Email:</label>
                <input type="text" name="email"
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    required
                />
                <br />
                <label htmlFor="">Password:</label>
                <input type="password" name="password"
                    required
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <br />
                <input type="submit" value="Login" />

            </form>
        </>
    );
}

export default Login;