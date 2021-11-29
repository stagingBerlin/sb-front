import axios from '../axios-config'

export const Signout = async () => {
  try {
      const res = await axios.post('/auth/logout')
      return res.data;
  } catch (error) {
    return error.response.data;
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


