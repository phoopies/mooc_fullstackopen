import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const create = async (blog) => {
    const config = {
        headers: { Authorization: token },
    };

    const res = await axios.post(baseUrl, blog, config);
    return res.data;
};

const update = async (blog) => {
    const config = {
        headers: { Authorization: token },
    };

    const res = await axios.put(baseUrl + '/' + blog.id, blog, config);
    return res.data;
};

const comment = async (blog, comment) => {
    const res = await axios.post(baseUrl + '/' + blog.id + '/comments', {
        comment,
    });
    return res.data;
};

const remove = async (blog) => {
    const config = {
        headers: { Authorization: token },
    };

    const res = await axios.delete(baseUrl + '/' + blog.id, config);
    return res;
};

export default { getAll, setToken, create, update, remove, comment };
