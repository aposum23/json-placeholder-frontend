import axios from "axios";

const httpCore = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    timeout: 1000 * 60
})

export default httpCore;