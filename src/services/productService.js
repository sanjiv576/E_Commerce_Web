

import axios from "axios";
const baseUrl = 'http://localhost:3005/products';

const getAllProudcts = () => {
    return axios.get(`${baseUrl}`);
};


const getSingleProductById = (id) => {
    return axios.get(`${baseUrl}/${id}`);
}

const getAllReviews = (id) => {
    return axios.get(`${baseUrl}/reviews/${id}`);

}

const productServices = {
    getAllProudcts,
    getSingleProductById,
    getAllReviews
}

export default productServices;