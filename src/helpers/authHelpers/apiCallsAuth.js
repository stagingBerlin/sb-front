import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export const Signout = async () => {
  try {
      const res = await axios.post('/auth/logout')
      return res.data;
  } catch (error) {
    return error;
  }
};

export const SignUpUser = async (data) => {
  try {
    const res = await axios.post("/auth/signup", data)
      return res.data;
  } catch(error){
    console.log(error)
    return error.response.data
  }
}

export const SignInUser = async (data) => {
    try {
      const res = await axios.post("/auth/login", data)
      console.log(res);
        return res.data;
    } catch(error){
      return error.response.data
    }
  }

  
export const authenticateUser = async () => {
  try {
    const res = await axios.post("/auth/verify")
    return res.data
  } catch (error) {
    return error.response.data
  }
}


