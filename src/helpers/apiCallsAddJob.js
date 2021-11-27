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

export const updateItemJobList = async (projectId, jobItemId, body) => {
    try {
        const res = await axios.put(`/projects/ownProjects/${projectId}/jobList/${jobItemId}`, body)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const deleteItemJobList = async ( projectId, jobItemId ) => {
    try {
        const res = await axios.delete(`/projects/ownProjects/${projectId}/jobList/${jobItemId}`)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const addParticipant = async (projectId, jobItemId, participantId) => {
    try {
        const res = await axios.put(`/projects/ownProjects/${projectId}/jobList/${jobItemId}/participant/${participantId}`)
        return res.data
    } catch (error) {
        console.log(error);
        return error.response.data
    }
}