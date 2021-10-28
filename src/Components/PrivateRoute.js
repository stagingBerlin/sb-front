import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Redirect, Route } from 'react-router';


const PrivateRoute = ({ path, component, redirectTo='/login' }) => {
    const { user, authIsDone } = useContext(UserContext);

    if (!authIsDone)
    return (
        <section className='page-wrapper'>
            <h5>Loading...</h5>
        </section>
    )

    if (authIsDone)
    return user ? ( 
            <Route path={path} component={component}></Route> 
            ) : ( 
            <Redirect to={redirectTo} /> 
            )
    }

export default PrivateRoute