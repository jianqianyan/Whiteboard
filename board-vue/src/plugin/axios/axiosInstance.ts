import axios from 'axios'

const API = axios.create({
    baseURL: '/api',
    timeout: 2000,
})

export default API
