import { Link, useNavigate } from "react-router-dom";
import dummyData from "../data/data";


import { useEffect, useState } from "react";
import userServices from "../services/userService";
import productServices from "../services/productService";
// for guest users
function LandingPage() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        productServices.getAllProudcts()
            .then(res => {

                // set in the state
                setProducts(res.data);

                // iterate each product from the response
                res.data.forEach(product => {
                    console.log(`Product name: ${product.name}`);
                });
            })
            .catch(err => window.alert(err.response.data.error));

    }, []);

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
                products.map((product) => {
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