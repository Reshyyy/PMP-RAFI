// AxiosAPI.jsx
import axios from 'axios';

export const getServerTokenApi = async () => {
    try {
        const res = await axios.get('rafi.ph/oauth2/token');
        console.log(res);
        localStorage.setItem('auth_token', res.data.token);
    } catch (err) {
        console.log(err);
    }
};
