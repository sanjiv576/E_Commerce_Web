
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// import dummyData from "../../data/data";

import { usePurchase } from "../../utils/purchaseContext";

import { useState } from "react";
import productServices from "../../services/productService";
import { useAuth } from "../../utils/authContext";
import './SingleProduct.css';
import { ResponsiveAppBarLandingPage } from "../AppBar/ResponsiveAppBarLandingPage";

function SingleProduct() {
    const purchase = usePurchase();
    const auth = useAuth();

    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(0);

    const [isUserLogin, setIsUserLogin] = useState(false);
    const [reviews, setReviews] = useState([]);



    useEffect(() => {
        console.log(`Auth: ${auth.email}`)
        if (auth.email) {
            setIsUserLogin(true);
            console.log(`User is login`);
        }
        else {
            console.log(`User is not login`);
        }
        productServices.getSingleProductById(productId)
            .then(res => {
                console.log(res.data)
                setProduct(res.data);
                const singleProduct = res.data;
                console.log(`Product id is : ${productId}`);
                console.log(`length of reviews from product: ${singleProduct.reviews.length}`);
                // setReviews(singleProduct.reviews);

                // get reviews

                productServices.getAllReviews(productId)
                    .then(res => {
                        console.log(`Reviews from api: ${res.data}`);

                        // iterate each response
                        res.data.forEach(review => {
                            console.log(`Review user name: ${review.userName}`);
                            console.log(`Review user picture: ${review.userPicture}`);
                            console.log(`Review: ${review.text}`);
                            console.log('-------------------')
                        });

                        setReviews(res.data);
                        console.log(`Review length: ${reviews.length}`)

                        reviews.forEach(review => {
                            console.log(`Review user name: ${review.userName}`);
                            console.log(`Review user picture: ${review.userPicture}`);
                            console.log(`Review: ${review.text}`);
                            console.log('-------------------')
                        });

                    })
                    .catch((err) => window.alert(err.response.data.error));



            })
            .catch((err) => window.alert(err.response.data.error));

    }, []);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
        if (quantity >= 8) {
            setQuantity(8);
        }
    };

    const handleDecrement = () => {

        setQuantity(quantity - 1);

        if (quantity <= 0) {
            setQuantity(0);
        }
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        if (quantity === 0) return window.alert('Please, select quantity first');

        const purchaseProudct = {
            "name": product.name,
            "quantity": quantity,
            "price": product.price,
        }

        console.log(`Selected purchase product name is : ${purchaseProudct.name}`);
        console.log(`Selected purchase product quantity is : ${purchaseProudct.quantity}`);
        console.log(`Selected purchase product price is : ${purchaseProudct.price}`);

        // add in the purchaseContext
        purchase.setPurchase([...purchase.purchase, purchaseProudct]);

        console.log(`Length of purchaseContext is : ${purchase.purchase.length}`)


        // print the data that storeing in the purchaseContext
        // console.log(`Purchase product name is : ${purchase[0].name}`);

        console.log("Add to cart");


    };

    return (
        <div>

            {
                isUserLogin ? (<>
                    {/* <ResponsiveAppBarLandingPage /> */}
                </>) : (<ResponsiveAppBarLandingPage />)
            }

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={`http://localhost:3005/product/${product.picture}`} className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">{product.name}</h1>
                        <p className="py-6">{product.description}</p>
                        {
                            isUserLogin ? (
                                <>
                                    <button onClick={handleDecrement} className="btn btn-outline glass btn-ghost mr-4">-</button>
                                    Quantity: {quantity}
                                    <button onClick={handleIncrement} className="btn btn-outline glass btn-ghost ml-4">+</button>
                                    <br />
                                    <button className="btn btn-primary btn-wide font-bold mt-8 mb-8" onClick={handleAddToCart}>Add to Cart</button>

                                </>
                            ) : null
                        }

                    </div>
                </div>
            </div>
            <h2 className="text-4xl font-bold">Reviews</h2>

            <div className="reviews-section m-10">
                <div className="send-review-section">Send review here</div>

                <div className="view-reviews">
                    {reviews && reviews.length > 0 ? (
                        reviews.map((review) => {
                            console.log('Review:', review);
                            return (
                                <div key={review._id}>
                                    <div className="chat chat-start">
                                        <p>{review.userName}</p>
                                        <h3>{review.text}</h3>
                                        {/* <div className="chat-image avatar">
                                            <div className="w-10 rounded-full">
                                                <img src={`http://localhost:3005/profile/${review.userPicture}`} />
                                            </div>
                                        </div>
                                        <div className="chat-bubble">{review.text}</div> */}
                                    </div>
                                </div>

                            );
                        })
                    ) : (
                        <h3>No Reviews</h3>
                    )}
                </div>

            </div>

            {/* <h1>Single Product</h1>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <p>{product.category}</p>
            <p>{product.description}</p>

            {
                isUserLogin ? (
                    <>
                        <button onClick={handleDecrement}>-</button>
                        Quantity: {quantity}
                        <button onClick={handleIncrement}>+</button>
                        <br />
                        <button onClick={handleAddToCart}>Add to Cart</button>
                    </>
                ) : null
            } */}
        </div>
    );
}

export default SingleProduct;