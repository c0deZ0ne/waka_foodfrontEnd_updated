import axios from 'axios';

const baseURL = 'https://wakafoods.herokuapp.com/waka-api'

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers:{
        // token or session
        'Content-Type':'application/json',
        accept: 'application/json',
    },
})