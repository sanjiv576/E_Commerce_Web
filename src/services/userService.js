import axios from "axios";

const baseUrl = 'http://localhost:3005/users';
const getToken = () => `bearer ${window.localStorage.getItem('token')}`;

const login = (loginCredentials) => {
    return axios.post(`${baseUrl}/login`, loginCredentials)
};

const lockAccount = (email) => {
    return axios.post(`${baseUrl}/lockAccount`, email);
}

const passwordNeedChange = () => {
    return axios.post(`${baseUrl}/passwordNeedChange`, {});
}

const getUser = () => {
    return axios.get(`${baseUrl}`, {
        headers: {
            Authorization: getToken()
        }

    });
}


const userServices = {
    login,
    lockAccount,
    passwordNeedChange,
    getUser,

}


export default userServices;