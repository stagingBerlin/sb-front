import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ path, component, redirectTo='/' }) => {
    const { user, authIsDone } = useContext(UserContext);

    if (!authIsDone)
    return (
        <section className='loading-wrapper '>
            <p><i>Loading...</i></p> 
        </section>
    )

    if (authIsDone)

    return user ? ( 
            <Route path={path} component={component} />
             
            ) : ( 
            <Redirect to={redirectTo} /> 
            )
    }

export default PrivateRoute