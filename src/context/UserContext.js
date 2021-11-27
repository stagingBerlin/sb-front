import React, { createContext, useState, useEffect } from 'react';
import { authenticateUser } from '../helpers/authHelpers/apiCallsAuth';
import { getJobs, getOwnProjects, getUsers } from '../helpers/apiCalls';

export const UserContext = createContext()

export const UserContextProvider = ({children}) => {

    const [ user, setUser ] = useState()
    const [ authIsDone, setAuthIsDone ] = useState(false)
    const [ ownProjects, setOwnProjects] = useState([])
    // here we will store our fetched jobs from API
    const [jobs, setJobs]= useState([])

    // store all users in the data base
    const [ usersdb, setUsersdb] = useState([])


    const getAllUsers = async () => {
        try {
            const users = await getUsers();
            if(!users.error){
                setUsersdb(users)
            }
        } catch (error) {
            console.log(error);
        }
    }

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
            const res = await getOwnProjects()
            if (!res.error) {
                setOwnProjects(res)
                
            } else {
                console.log(res.error)            
            }
            
          } 
        getAllUsers()
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
                    ownProjects, setOwnProjects,
                    usersdb, setUsersdb
                }
            }
        >
            {children}
        </UserContext.Provider>
    )
};
