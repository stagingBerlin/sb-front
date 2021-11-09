import axios from 'axios'

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
  
  export const getJobs = async () => {

    try {
      const res = await axios.get(`/jobs`)
      return res.data
    } catch(error){
        return error
    }

  }

  export const updateUser = async (id, data) => {
    try {
      const res = await axios.put(`/users/${id}`, data)
        return res.data
    } catch(error){
      return error
    }
  }

  export const createProject = async (data) => {
    try {
      const res = await axios.post("/projects", data)
        return res.data;
    } catch(error){
      console.log(error)
      return error.response.data
    }
  }

  export const getOwnProject = async () => {

    try {
      const res = await axios.get("/projects/ownProjects")
      return res.data
    } catch(error){
        return error
    }

  }

  