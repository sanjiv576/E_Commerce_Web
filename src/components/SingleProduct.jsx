
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import dummyData from "../data/data";

import { usePurchase } from "../utils/purchaseContext";

import { useState } from "react";


function SingleProduct() {
    const purchase = usePurchase();

    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(0);



    useEffect(() => {

        console.log(`Product id is : ${productId}`)
        const productData = dummyData.filter((product) => product.id == productId);
        setProduct(productData[0]);
        console.log(productData[0]);

        console.log(`Product name is : ${product.name}`)

    }, [productId]);

    const hanldeIncrement = () => {
        setQuantity(quantity + 1);
        if (quantity >= 8) {
            setQuantity(8);
        }
    };

    const hanldeDecrement = () => {

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
            <h1>Single Product</h1>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <p>{product.category}</p>
            <p>{product.description}</p>

            <button onClick={hanldeDecrement}>-</button>
            Quantity: {quantity}
            <button onClick={hanldeIncrement}>+</button>
            <br />
            <button onClick={handleAddToCart}>Add to Cart</button>



        </div>
    );
}

export default SingleProduct;