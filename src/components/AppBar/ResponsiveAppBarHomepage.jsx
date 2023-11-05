import React, { useEffect, useState } from 'react'
import userServices from '../../services/userService';
import { NavLink, useNavigate } from 'react-router-dom';

export const ResponsiveAppBarHomepage = ({ purchaseProductLength }) => {

    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [isPasswordNeedToBeChange, setIsPasswordNeedToBeChange] = useState(false);

    useEffect(() => {
        console.log(`Total purchase product length from appbar: ${purchaseProductLength}`);
        userServices.getUser()
            .then(res => {
                setUser(res.data)

                // check if password need to be change or not
                // userServices.passwordNeedChange({data: ''})
                //     .then(responseFromServer => {
                //         console.log(`Password need to be change: ${responseFromServer.data}`);
                //     })
                //     .catch(err => window.alert(err.response.data.error));
            })
            .catch(err => window.alert(err.response.data.error));


    }, []);

    const handleViewCart = () => {
        navigate('/purchaseCart');
    };

    const handleLogout = () => {
        // remove token from local storage
        window.localStorage.removeItem('token');

        // clear user data from state
        setUser({});

        // clear purchase data from context api


        // redirect to home page
        navigate('/');
    };
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">Hi, {user.fullName}</a>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        {
                            user.role === 'user' &&
                            <label className="btn btn-ghost btn-circle">
                                <div className="indicator" onClick={handleViewCart}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="badge badge-sm indicator-item">{purchaseProductLength}</span>
                                </div>
                            </label>
                        }

                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={`http://localhost:3005/profile/${user.picture}`} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                            {
                                user.role === 'user' ?
                                    <li><NavLink to={'/home'}>Dashboard</NavLink></li>
                                    : <li><NavLink to={'/addProduct'} >Add Product</NavLink></li>

                            }
                            <li>
                                <NavLink to={'/profile'}>Profile</NavLink>

                            </li>
                            {
                                user.role === 'user' ?
                                    <li><NavLink to={'/purchaseHistory'}>Purchase History</NavLink></li>
                                    : <li><NavLink to={'/viewAllProducts'}>View All Products</NavLink></li>
                            }

                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
