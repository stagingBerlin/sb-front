import axios from './axios-config'

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

  // get All the users in the Data Base
  export const getUsers = async ()=> {
    try {
      const res = await axios.get(`/users`)
      return res.data
    } catch (error) {
      return error.response.data
    }
  }


  export const getProjects = async () => {
    try {
      const res = await axios.get(`/projects`)
      return res.data
    } catch(error){
        return error
    }
  }

  export const createProject = async (data) => {
    try {
      const res = await axios.post(`/projects`, data)
        return res.data;
    } catch(error){
      console.log(error)
      return error.response.data
    }
  }

  export const getAllProjects = async () => {
    try {
      const res = await axios.get(`/projects`)
        return res.data;
    } catch (error) {
      return error.response.data
    }
  }

  export const getOwnProjects = async () => {

    try {
      const res = await axios.get(`/projects/ownProjects`)
      return res.data
    } catch(error){
        console.log(error.response.data)
        return error.response.data
    }

  }

  export const getOwnProject = async (id) => {

    try {
      const res = await axios.get(`/projects/ownProjects/${id}`)
      return res.data
    } catch(error){
        console.log(error.response.data)
        return error.response.data
    }

  }

  export const updateOwnProject = async (id, data) => {
    try {
      const res = await axios.put(`/projects/ownProjects/${id}`, data)
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

  export const createNotification = async (data) => {
    try {
      const res = await axios.post(`/notifications/`, data)
        return res.data
    } catch(error){
      return error
    }
  }

  export const getNotifications = async () => {
    try {
      const res = await axios.get(`/notifications`)
      return res.data
    } catch (error) {
      return error.response.data
    }
  }

  export const updateNotification = async (id, data) => {
    try {
      const res = await axios.put(`/notifications/${id}`, data)
      return res.data
    } catch (error) {
      return error.response.data
    }
  }

  export const bookmarkIt = async (data) => {

    try {
      const res = await axios.put(`/users/bookmark`, data)
        return res.data
    } catch(error){
      return error
    }
  }