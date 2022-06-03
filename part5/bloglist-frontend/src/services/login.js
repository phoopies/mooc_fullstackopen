import axios from "axios";
const baseUrl = '/api/login';

const login = async (username, password) => {
    const credentials = {
        username,
        password,
    };
    const res = await axios.post(baseUrl, credentials);
    return res.data;
}

export default { login };