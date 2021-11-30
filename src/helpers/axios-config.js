import axios from 'axios'

const axiosInstance =  axios.create({
    // baseURL: process.env.REACT_APP_API_BASE,
    baseURL: 'http://localhost:5000/',
    withCredentials: true
})

export default axiosInstance

