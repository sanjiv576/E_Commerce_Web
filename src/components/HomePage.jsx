// only for registered users
import dummyData from "../data/data";
import { Link } from "react-router-dom";
function HomePage() {

    const handleView = () => {};
    return (
        <>
            <h1>Home Page</h1>

            <p>NOte: Registered Users mode only</p>

            <h3>Products</h3>

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