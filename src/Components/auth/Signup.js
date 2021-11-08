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

    // const handleInputFile = (e) => {
    //     const inputFile = e.target.files[0];
    
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       // console.log(reader);
    //       // setAvatar(reader.result);
    //     };
    //     reader.readAsDataURL(inputFile);
    //   };
    

      const handleSubmit = async (e) => {
        e.preventDefault();
        const completeData = { ...signupData, isHiring: isHiring }
        const res = await SignUpUser(completeData);
    
        if(res.error){
          setErrorMsg(res.error.message)
        }
        else{
          setUser(completeData)
          
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
            {/* <div className="avatar">
              <label className="avatar__label" htmlFor="avatar">
                <img
                  className="avatar__img"
                  width="100"
                  height="100"
                  src={
                    avatar
                      ? avatar
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/320px-User-avatar.svg.png"
                  }
                  alt="avatar"
                />
              </label>
              <input
                id="avatar"
                name="avatar"
                className="avatar__file"
                type="file"
                accept="image/*"
                onChange={(e) => handleInputFile(e)}
              />
            </div>
            
            <input
              type="text"
              name="firstname"
              onChange={handleChange}
              className="form__input"
              placeholder="First Name"
              value={signupData.firstname}
            />
            
            <input
              type="text"
              name="lastname"
              onChange={handleChange}
              className="form__input"
              placeholder="Last Name"
              value={signupData.lastname}
            />

            <input
              type="text"
              name="username"
              onChange={handleChange}
              className="form__input"
              placeholder="Username"
              value={signupData.username}
            /> */}
            
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
              //checked={isHiring}
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
            <div className='separator'>or sign up with</div>
            <div className="form__media">
              <i className="fab fa-facebook-square form__media--facebook"></i>
              <i className="fab fa-twitter-square form__media--twitter"></i>
            </div>
          </div>
        </form>


        </div>
        </>
    )
}
