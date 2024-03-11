import axios from "axios";

const httpCore = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    timeout: 1000
})

export default httpCore;