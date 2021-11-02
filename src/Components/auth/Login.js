import React, { useState, useContext } from "react"
import { useHistory, Link } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { SignInUser } from "../../helpers/authHelpers/apiCallsAuth"
import { toast } from 'react-toastify';

export default function Login() {

    const history = useHistory()
    const { setUser }= useContext(UserContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ errorMsg, setErrorMsg] = useState()
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
          email: email,
          password: password,
        }

        const user = await SignInUser(data);
        if(user.error){
          setErrorMsg(user.error.message)
        } else {
          setUser(data)
          console.log(data)
          history.push("/account/dashboard")
        }
      }
    

    return (
        <>
          <form className="form" onSubmit={handleSubmit}>
            <h2 className="form__heading">Login</h2>
    
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
                <p>No account yet?</p>
                <Link
                  to="/signup"
                  className="form__linktoSignup"
                >
                  Click Here to Sign Up
                </Link>
              </div>

              <div className='separator'>or with</div>

              <div className="form__media">
                <i className="fab fa-facebook-square form__media--facebook"></i>
                <i className="fab fa-twitter-square form__media--twitter"></i>
              </div>
            </div> 
        </form>
        </>
    )
}
