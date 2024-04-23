import axios from 'axios';

export default axios.create({
    baseURL: "http://195.251.117.66:8080/",
    headers: { "ngrok-skip-browser-warning": "true" }
});