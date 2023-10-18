import axios from "axios";

const baseUrl = 'http://localhost:3005/users';

const login = (loginCredentials) => {
    return axios.post(`${baseUrl}/login`, loginCredentials)
};

const lockAccount = (email) => {
    return axios.post(`${baseUrl}/lockAccount`, email);
}

const passwordNeedChange = () => {
    return axios.post(`${baseUrl}/passwordNeedChange`, {});
}


const userServices = {
    login,
    lockAccount,
    passwordNeedChange,

}


export default userServices;