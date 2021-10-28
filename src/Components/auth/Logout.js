import React, {useEffect} from 'react';
import { Signout } from '../helpers/apiCalls';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

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