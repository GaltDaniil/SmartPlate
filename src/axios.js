import axios from 'axios';

const instance = axios.create({
    //baseURL: 'http://localhost:8080/api',
    baseURL: 'http://smartdietai.ru/api',
});

export default instance;
