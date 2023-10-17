
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authContext';
function Login() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });


    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login");

        console.log(`Email: ${credentials.email}`);
        console.log(`Password: ${credentials.password}`)

        // assume email and password are valid as 'sanjiv@gmail.com' and 'sanjiv123' respectively
        if (credentials.email === 'sanjiv@gmail.com' || credentials.password === 'sanjiv123') {

            // set the user as logged in
            auth.setEmail(credentials.email);

            // create purchase context just like the auth.setEmail

            navigate('/home');
        } else {
            window.alert('Invalid credentials');
        }

        // console.log(data);
    };
    return (
        <>
            <h1>Login Page</h1>

            <form action="" onSubmit={handleLogin}>
                <label htmlFor="">Email:</label>
                <input type="email" name="email"
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