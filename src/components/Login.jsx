
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authContext';
import { useUser } from '../utils/userContext';
import userServices from '../services/userService';
function Login() {
    const auth = useAuth();
    const user = useUser();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const [counter, setCounter] = useState(0);



    const handleLogin = (e) => {
        e.preventDefault();

        console.log(`Email: ${credentials.email}`);
        console.log(`Password: ${credentials.password}`);

        userServices.login(credentials)
            .then(res => {
                // set the user as logged in
                auth.setEmail(credentials.email);

                //   get the token from the response and save in the local storage
                window.localStorage.setItem('token', res.data.token);

                // store the user in the user context
                user.setUser(res.data.user);

                // naviagte to the home page if it is user , otherwise to the admin profile
                if (res.data.user.role === 'user') {
                    navigate('/home');
                }
                else if (res.data.user.role === 'admin') {
                    navigate('/adminProfile');
                }
            })
            .catch(err => {
                window.alert(err.response.data.error);

                // if the account is not registered, then redirect to the register page
                if (err.response.data.error == 'Account has not been registered.') {
                    setCounter(counter + 1);
                }

                // if wrong credentials are attempted more than 3 times, then lock the account
                if (counter === 3) {
                    // lock the account
                    userServices.lockAccount({ email: credentials.email })
                        .then(res => {
                            if (res.data.status === 'disable') {
                                window.alert('Your account has been locked. Please, contact the admin to unlock your account.');
                            }
                            // reset the counter
                            setCounter(0);
                        })
                        .catch(err => {
                            window.alert(err.response.data.error);
                        });

                }
                // 
            });

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