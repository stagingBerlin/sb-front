const serverUrl = 'http://localhost:5000';

export const SignInUser = async (data) => {
    try {
      const res = await (
        await fetch(`${serverUrl}/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'}, 
          body: JSON.stringify(data),    
          credentials: "include"  
        })).json();
        return res;
    } catch(error){
      return error
    }
  }
  
  export const SignUpUser = async (data) => {
    try {
      const res = await (
        await fetch(`${serverUrl}/users/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(data),   
          credentials: "include"    
        })).json();
        return res;
    } catch(error){
      return error
    }
  }

  export const Signout = async () => {
    try {
          const res = await fetch(`${serverUrl}/users/logout`, {
          method: 'GET',
          credentials: 'include'
        }).json();
        return res;
    } catch (error) {
      return error;
    }
    
  };