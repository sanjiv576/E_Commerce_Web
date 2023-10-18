

import axios from "axios";
const baseUrl = 'http://localhost:3005/products';

const getAllProudcts = () => {
    return axios.get(`${baseUrl}`);
};

const productServices = {
    getAllProudcts,
}

export default productServices;