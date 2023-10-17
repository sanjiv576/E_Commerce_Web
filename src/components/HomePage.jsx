// only for registered users
import { useEffect, useState } from "react";
import dummyData from "../data/data";
import { Link } from "react-router-dom";

import { usePurchase } from "../utils/purchaseContext";


function HomePage() {
    const purchase = usePurchase();

    const [purchaseProduct, setPurchaseProduct] = useState({});

    useEffect(() => {
        console.log(`Purchase context length from homepage is : ${purchase.purchase.length}`);

        setPurchaseProduct(
            {
                items: purchase.purchase,
                // totalPrice: purchase.purchase.reduce((total, item) => total + (item.price * item.quantity), 0),
                payment: "pending",
            }
        );
    }, []);


    const clearPurchaseContext = () => {
        purchase.setPurchase([]); // empty the purchase context
        setPurchaseProduct({});
        console.log('Puchase context cleared');
    };

    // this works fine
    const handlePurchaseCancellation = (e) => {
        e.preventDefault();

        // if(purchase.purchase.length === 0) return window.alert('Please, add to cart first');

        const confirmation = window.confirm('Are you sure you want to cancel the purchase?');
        if (confirmation) {
            console.log('Purchase cancelled');
            clearPurchaseContext();
            console.log(`After cancellation, purchase context length from homepage is : ${purchase.purchase.length}`);

        }
    };




    // this works fine
    const handlePurchase = (e) => {
        e.preventDefault();

        if (purchase.purchase.length === 0) {
            window.alert('Please, add to cart first');
        }
        else {
            console.log('Go to Khalti payement gateway. Then, only, POST to the server');

            // assume payment is successful

            const finalPurchaseProduct = { ...purchaseProduct, payment: "success" };

            finalPurchaseProduct.items.map((item) => {
                console.log(`Purchase product name is : ${item.name}`);
                console.log(`Purchase product quantity is : ${item.quantity}`);
                console.log(`Purchase product price is : ${item.price}`);
                console.log('-----------------------------------');
            });

            // call API end point here

            // clear the purchase context after successfull payment
            clearPurchaseContext();

        }

    };

    const handleView = () => { };
    return (
        <>
            <h1>Home Page</h1>

            <p>NOte: Registered Users mode only</p>

            <h3>Products</h3>
            <button onClick={handlePurchase}>Purchase✔️✔️</button>
            <br />
            {
                purchase.purchase.length > 0 && (
                    <button onClick={handlePurchaseCancellation}>Cancel</button>

                )

            }

            {
                dummyData.map((product) => {
                    return (
                        <div key={product.id}>
                            <h4>{product.id}</h4>
                            <h4>{product.name}</h4>
                            <p>{product.price}</p>
                            <p>{product.category}</p>
                            <p>{product.description}</p>
                            <button onClick={handleView}>View</button>
                            <Link to={`/singleProduct/${product.id}`}>Get VIew</Link>
                        </div>
                    );
                })
            }
        </>
    );

}

export default HomePage;