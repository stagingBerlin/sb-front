import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Login() {

    const history = useHistory()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ errorMsg, setErrorMsg] = useState()
    const { setUser }= useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
          email: email,
          password: password,
        };
        // const user = await login(data);
        // if(user.error){
        //   setErrorMsg(user.error.message)
        // }
        // else{
          setUser(data)
        //   history.push("/dashboard")
        // }
      };
    

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
          <h2 className="form__heading">Login to your Account</h2>
  
          <div className="form__content">
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form__input"
              placeholder="E-mail"
            />
            
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form__input"
              placeholder="Password"
            />

            {
              errorMsg ?
              <div className="form__error">
                  {errorMsg} !
              </div>
              :
              <></>
            }
          
            <input
              type="submit"
              value="Login"
              className="button-primary form__buttonSubmit"
            />

            <div className="form__toSignup">
              <p>You don't have an account?</p>
              <Link
                to="/signup"
                className="form__linktoSignup"
              >
                Click to Sign Up
              </Link>
            </div>

            <div className='separator'>or</div>

            <div className="form__media">
              <i className="fab fa-facebook-square form__media--facebook"></i>
              <i className="fab fa-twitter-square form__media--twitter"></i>
            </div>
          </div> 
        </form>
        </>
    )
}
