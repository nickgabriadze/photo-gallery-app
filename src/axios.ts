import axios from "axios";

const unsplashApiInstance = axios.create({
    baseURL: 'https://api.unsplash.com'
});

unsplashApiInstance.defaults.headers.common['Authorization'] = `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`;

export default unsplashApiInstance