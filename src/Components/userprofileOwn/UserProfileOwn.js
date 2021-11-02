import React, {useState, useContext } from 'react'
import { UserContext } from "../../context/UserContext"

function UserProfileOwn() {
    const { user, setUser } = useContext(UserContext)
    const { profile, setProfile } = useState()
    

    return (
        <>
          <h2>User Profile</h2>
          <p> {user.username}</p>
            {/* <form className="form" onSubmit={handleSubmit}>
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
            </form> */}
        </>
    )
}

export default UserProfileOwn
