import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext"
import { SignUpUser } from '../../helpers/authHelpers/apiCallsAuth'

export default function Signup() {

    const { setUser } = useContext(UserContext)
    const history = useHistory()
    
    const [ signupData, setSignupData ] = useState({
        email: "",
        password: ""
    })
    const [isHiring, setIsHiring] = useState(false)
    const [ errorMsg, setErrorMsg ] = useState();

    const toggleChecked = (e) => {
      setIsHiring(value => !value)
    }

    const handleChange = (e) => {
        setSignupData({
          ...signupData, [e.target.name] : e.target.value
        })
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        const completeData = { ...signupData, isHiring: isHiring }
        const res = await SignUpUser(completeData);
    
        if(res.error){
          setErrorMsg(res.error.message)
        }
        else{
          setUser(res)
          
          //setAvatar(null)
          setSignupData({ 
            email: "",
            password: ""
          })
          setErrorMsg()
          history.push("/account/dashboard") 
        }    
      };
      
    return (
        <>
        <div className="auth-page">
           <form className="form" onSubmit={handleSubmit}>
          <h2 className="form__heading">Sign Up </h2>
          <div className="form__content">
          
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="form__input"
              placeholder="Email"
              value={signupData.email}
            />
            
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="form__input"
              placeholder="Password"
              value={signupData.password}
            />

            <input 
              type="radio"  
              name="ishiring"
              onChange={(e)=>toggleChecked(e)}
              value=""
              defaultChecked
              className="form__input">
            </input>
            <label htmlFor="ishiring">I'm looking for a job</label>

            <input 
              type="radio"  
              name="ishiring"
              onChange={(e)=>toggleChecked(e)}
              checked={isHiring}
              className="form__input">
            </input>
            <label htmlFor="ishiring">I'm looking for people</label>

            {
              errorMsg ?
              <div className="form__error" style={{color: "red", fontWeight: "bold"}}>
                  {errorMsg}
              </div>
              :
              <></>
            }

            <input
              type="submit"
              value="Sign Up"
              className="button-primary form__buttonSubmit"
            />
            {/* <div className='separator'>or sign up with</div>
            <div className="form__media">
              <i className="fab fa-facebook-square form__media--facebook"></i>
              <i className="fab fa-twitter-square form__media--twitter"></i>
            </div> */}
          </div>
        </form>


        </div>
        </>
    )
}
