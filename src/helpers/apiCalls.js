import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export const fetchUser = async(data)=> {
    
    try {
      const res = await axios.get(`/users/${data._id}`)
      return res.data
      
    } catch (error) {
      return error.response.data
    }
  }