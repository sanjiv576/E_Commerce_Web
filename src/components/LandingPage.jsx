import { Link, useNavigate } from "react-router-dom";
import dummyData from "../data/data";


import { useState } from "react";
// for guest users
function LandingPage() {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(false);

    const handleAddToCart = () => {

        // const confirmation = window.confirm('Please, login to add to cart!');

        if (isLogin) {
            navigate('/sinlgeProduct');
        } else {

            window.alert('Not authorization. Please, login!');
            navigate('/login');
        }
    };


    return (
        <>
            <h1>Landing Page</h1>

            <p>NOte: Guest mode only</p>

            <h3>Products</h3>

            <Link to={'/login'}>Login</Link>


            {
                dummyData.map((product) => {
                    return (
                        <div key={product.id}>
                            <h4>{product.name}</h4>
                            <p>{product.price}</p>
                            <p>{product.category}</p>
                            <p>{product.description}</p>
                            <button onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                    );
                })
            }
        </>
    );
}

export default LandingPage;