import axios from 'axios';
const serverUrl = 'http://localhost:5000';

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

  export const updateUser = async (data) => {

    try {
      const res = await (
        await fetch(`${serverUrl}/users/${data._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json'}, 
          body: JSON.stringify(
                data
                ),   
          credentials: "include"   
        })).json();
        return res;
    } catch(error){
      return error;
    }

  }