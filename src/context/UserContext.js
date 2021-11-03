import React, { createContext, useState, useEffect } from 'react';
import { authenticateUser } from '../helpers/authHelpers/apiCallsAuth';

export const UserContext = createContext()

export const UserContextProvider = ({children}) => {

    const [ user, setUser ] = useState()
    const [ authIsDone, setAuthIsDone ] = useState(false)

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
        auth();
    }, []);
   
    return (
        <UserContext.Provider
            value={
                {
                    user, setUser,
                    authIsDone, setAuthIsDone
                }
            }
        >
            {children}
        </UserContext.Provider>
    )
};
