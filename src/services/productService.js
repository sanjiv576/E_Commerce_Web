

import axios from "axios";
const baseUrl = 'http://localhost:3005/products';
const getToken = () => `bearer ${window.localStorage.getItem('token')}`;
const getAllProudcts = () => {
    return axios.get(`${baseUrl}`);
};


const getSingleProductById = (id) => {
    return axios.get(`${baseUrl}/${id}`);
}

const getAllReviews = (id) => {
    return axios.get(`${baseUrl}/reviews/${id}`);

}

const purchaseProduct = (products) => {
    return axios.post('http://localhost:3005/purchase', products, {
        headers: {
            Authorization: getToken()
        }

    });
};

const productServices = {
    getAllProudcts,
    getSingleProductById,
    getAllReviews,
    purchaseProduct,
}

export default productServices;