import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export const addJobToList = async(id, body) => {
    try {
        const res = await axios.post(`/projects/ownProjects/${id}/jobList`, body)
        return res.data
    } catch (error) {
        return error.response.data
    }
}