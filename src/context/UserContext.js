import React, { createContext, useState, useEffect } from 'react';
import { authenticateUser } from '../helpers/authHelpers/apiCallsAuth';
import { getJobs, getOwnProject } from '../helpers/apiCalls';

export const UserContext = createContext()

export const UserContextProvider = ({children}) => {

    const [ user, setUser ] = useState()
    const [ authIsDone, setAuthIsDone ] = useState(false)
    const [ ownProjects, setOwnProjects] = useState([])
    // hier we will store our fetched jobs from API
    const [jobs, setJobs]= useState([])

    useEffect(()=> {
        const auth = async () => {
            try {
                const res = await authenticateUser();

                if(!res.error){
                    setUser(res)
                    setAuthIsDone(true);
                    return;
                }
                setUser();
                setAuthIsDone(true);

            } catch (error) {
                console.log(error);
            };
        };

        const getJobsApi = async () => {
            const res = await getJobs()
            setJobs(res)
          }
        
          const fetchOwnProjects = async ()=> {
            const res = await getOwnProject()
            if (!res.error) {
                setOwnProjects(res)
            } 
          } 
          
        fetchOwnProjects()
        getJobsApi()
        auth();
    }, []);
   
    return (
        <UserContext.Provider
            value={
                {
                    user, setUser,
                    authIsDone, setAuthIsDone,
                    jobs, setJobs,
                    ownProjects, setOwnProjects
                }
            }
        >
            {children}
        </UserContext.Provider>
    )
};
