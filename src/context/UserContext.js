import React, { createContext, useState, useEffect } from 'react';
import { authenticateUser } from '../helpers/authHelpers/apiCallsAuth';
import { getJobs } from '../helpers/apiCalls';

export const UserContext = createContext()

export const UserContextProvider = ({children}) => {

    const [ user, setUser ] = useState()
    const [ authIsDone, setAuthIsDone ] = useState(false)

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

          getJobsApi()
        auth();
    }, []);
   
    return (
        <UserContext.Provider
            value={
                {
                    user, setUser,
                    authIsDone, setAuthIsDone,
                    jobs, setJobs
                }
            }
        >
            {children}
        </UserContext.Provider>
    )
};
