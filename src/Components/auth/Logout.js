import React, {useEffect} from 'react';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Signout } from '../../helpers/authHelpers/apiCallsAuth';

const Logout = ({history}) => {

    const { setUser } = useContext(UserContext);

    useEffect(()=> {
        const logmeout = async() => {
            await Signout()
            .then(setUser(null));
            toast(`logged out successfully!`);
            history.push('/login');    
         }
         logmeout();
    }, [])
  
    return (
        <div>
            logging you out...
        </div>
    )
}

export default Logout;