import axios from "axios";

const baseUrl = 'http://localhost:3005/users';
const getToken = () => `bearer ${window.localStorage.getItem('token')}`;

const register = (userData) => {
    return axios.post(`${baseUrl}/register`, userData);

}
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
};

const deleteAccount = () => {
    return axios.delete(`${baseUrl}`, {
        headers: {
            Authorization: getToken()
        }
    });
};

const changeEmail = (newEmail) => {
    return axios.put(`${baseUrl}`, newEmail, {
        headers: {
            Authorization: getToken()
        }
    });

};

const changePassword = (newPassword) => {
    return axios.put(`${baseUrl}/changePassword`, newPassword, {
        headers: {
            Authorization: getToken()
        }
    });
};


// upload file or image for profile
const uploadProfileImage = (selectedImageFile) => {
    const formData = new FormData();
    formData.append('photo', selectedImageFile);

    const config = {
        headers: {
            Authorization: getToken(),
            'Content-Type': 'multipart/form-data'
        }
    };

    return axios.post('http://localhost:3005/uploads', formData, config);
};
// upload file or image for profile
const uploadProductImage = (productId, selectedImageFile) => {
    const formData = new FormData();
    formData.append('photo', selectedImageFile);

    const config = {
        headers: {
            Authorization: getToken(),
            'Content-Type': 'multipart/form-data'
        }
    };

    return axios.post(`http://localhost:3005/uploads/${productId}`, formData, config);
};


const userServices = {
    login,
    lockAccount,
    passwordNeedChange,
    getUser,
    register,
    deleteAccount,
    changeEmail,
    changePassword,
    uploadProductImage,
    uploadProfileImage,

}


export default userServices;