
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import dummyData from "../data/data";

import { useState } from "react";


function SingleProduct() {

    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [count, setCount] = useState(0);



    useEffect(() => {

        console.log(`Product id is : ${productId}`)
        const productData = dummyData.filter((product) => product.id == productId);
        setProduct(productData[0]);
        console.log(productData[0]);

        console.log(`Product name is : ${product.name}`)

    }, [productId]);

    const hanldeIncrement = () => {
        setCount(count + 1);
        if (count >= 8) {
            setCount(8);
        }
    };

    const hanldeDecrement = () => {

        setCount(count - 1);

        if (count <= 0) {
            setCount(0);
        }
    };

    return (
        <div>
            <h1>Single Product</h1>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <p>{product.category}</p>
            <p>{product.description}</p>

            <button onClick={hanldeDecrement}>-</button>
            {/* <span>{count}</span> */}
            Quantity: {count}
            <button onClick={hanldeIncrement}>+</button>
            <br />
            <button>Add to Cart</button>



        </div>
    );
}

export default SingleProduct;