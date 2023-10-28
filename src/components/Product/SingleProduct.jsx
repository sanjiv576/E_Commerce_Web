
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import dummyData from "../../data/data";

import { usePurchase } from "../../utils/purchaseContext";

import { useState } from "react";
import productServices from "../../services/productService";
import { useAuth } from "../../utils/authContext";
import { ResponsiveAppBarLandingPage } from "../AppBar/ResponsiveAppBarLandingPage";
import { Alert, IconButton, Input, Snackbar } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { ResponsiveAppBarHomepage } from "../AppBar/ResponsiveAppBarHomepage";

function SingleProduct() {
    const purchase = usePurchase();
    const auth = useAuth();
    const navigate = useNavigate();

    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(0);

    const [isUserLogin, setIsUserLogin] = useState(false);
    const [reviews, setReviews] = useState([]);
    // review state for writing
    const [feedback, setFeedback] = useState('');
    const [snack, setSnack] = useState({
        type: '',
        message: '',
    });

    // for open and close snackbar
    const [open, setOpen] = React.useState(false);

    // for closing snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };



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


        setSnack({ type: 'success', message: 'Product added to cart successfully!' });
        setOpen(true);

        // reset the quantity
        setQuantity(0);
        return;
        // navigate('/home');


        console.log("Add to cart");


    };

    const handleReview = (e) => {
        e.preventDefault();

        if (isUserLogin) {
            if (feedback === '') {
                setSnack({ type: 'error', message: 'Please, write a review!' });
                setOpen(true);
                return;
            }

            setSnack({ type: 'success', message: 'Review added successfully!' });
            setOpen(true);
            setFeedback('');
        }
        else {
            setSnack({ type: 'error', message: 'Please, login to write a review!' });
            setOpen(true);
        }

    };

    return (
        <div>

            {
                isUserLogin ? (<>
                    <ResponsiveAppBarHomepage purchaseProductLength={purchase.purchase.length} />
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
            <h2 className="text-4xl font-bold m-4">Reviews</h2>

            <div className="reviews-section m-10">
                <div className="send-review-section">
                    <Input
                        type="text"

                        placeholder="Write a review ..."
                        onChange={(e) => setFeedback(e.target.value)}
                        value={feedback}
                        className="input input-bordered text-2xl w-1/2"
                        style={{ color: 'white' }}
                        endAdornment={<span className="input-icon">
                            <IconButton onClick={handleReview} style={{ color: 'white' }}><SendIcon />
                            </IconButton></span>}
                    />
                </div>

                <div className="view-reviews">
                    {reviews && reviews.length > 0 ? (
                        reviews.map((review) => {
                            console.log('Review:', review);
                            return (
                                <div key={review._id}>
                                    <div className="chat chat-start">
                                        <div className="chat-image avatar">
                                            <div className="w-10 rounded-full">
                                                <img src={`http://localhost:3005/profile/${review.userPicture}`} className="max-w-sm rounded-lg shadow-2xl" />

                                            </div>
                                        </div>
                                        <div className="chat-header text-info">{review.userName}</div>
                                        <div className="chat-bubble">{review.text}</div>
                                    </div>
                                </div>

                            );
                        })
                    ) : (
                        <h3>No Reviews</h3>
                    )}
                </div>

            </div>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snack.type} sx={{ width: '100%' }}>
                    {snack.message}
                </Alert>
            </Snackbar>

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