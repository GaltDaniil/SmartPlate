import axios from 'axios';

const instance = axios.create({
    //baseURL: 'http://localhost:8080/api',
    //baseURL: 'https://smartdietai.ru/api',
    baseURL: 'http://localhost:8080/api',
});

export default instance;
