import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = async (title, author, url) => {
    const config = {
        headers: { Authorization: token }
    };

    const blog = {
        title, author, url
    };

    const res = await axios.post(baseUrl, blog, config);
    return res;
};

export default { getAll, setToken, create };