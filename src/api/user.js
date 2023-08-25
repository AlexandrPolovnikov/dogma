import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const authorizedUserApi = async (formData, callback, errCallback) => {
    instance
        .post('api/login', JSON.stringify(formData))
        .then((res) => {
            callback(res.data);
            return res;
        })
        .catch((err) => {
            errCallback(err.response?.data);
            return err;
        });
};

export const logoutUserApi = async (callback, errCallback) => {
    instance
        .delete('api/logout')
        .then((res) => {
            callback(res.data);
            return res;
        })
        .catch((err) => {
            errCallback(err.response?.data);
            return err;
        });
};

export const getProfileDataApi = async (callback, errCallback) => {
    instance
        .get('api/profile/0')
        .then((res) => {
            callback && callback(res.data);
            return res;
        })
        .catch((err) => {
            errCallback && errCallback(err.response?.data);
            return err;
        });
};
