import { Link, useNavigate } from "react-router-dom";
import dummyData from "../data/data";


import { useEffect, useState } from "react";
import userServices from "../services/userService";
import productServices from "../services/productService";
import { ResponsiveAppBarLandingPage } from "./AppBar/ResponsiveAppBarLandingPage";

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
            <ResponsiveAppBarLandingPage />

            <div className="text-3xl p-2 font-bold">Welcome to Samaan Kinam E-commerce</div>
            <div className="carousel w-full h-90 carousel-section">
                <div id="item1" className="carousel-item w-full">
                    <img src="./images/4.png" className="w-full" />

                </div>
                <div id="item2" className="carousel-item w-full">
                    <img src="./images/3.png" className="w-full" />

                </div>
                <div id="item3" className="carousel-item w-full">
                    <img src="./images/5.png" className="w-full" />

                </div>
                <div id="item4" className="carousel-item w-full">
                    <img src="./images/2.png" className="w-full" />

                </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                <a href="#item1" className="btn btn-xs btn-secondary">1</a>
                <a href="#item2" className="btn btn-xs btn-secondary">2</a>
                <a href="#item3" className="btn btn-xs btn-secondary">3</a>
                <a href="#item4" className="btn btn-xs btn-secondary">4</a>
            </div>


            <div className="carousel carousel-end rounded-box row-carousel mt-4">

                {
                    [...Array(5)].map((_, i) => {
                        return products.map((product) => {
                            return (

                                <div className="carousel-item mr-5" key={product.id + i}>
                                    <img src={`http://localhost:3005/product/${product.picture}`} alt="Drink" />
                                </div>

                            );
                        })
                    })
                } 

            </div>


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
                            <p>{product.picture}</p>
                            <button onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                    );
                })
            }
        </>
    );
}

export default LandingPage;