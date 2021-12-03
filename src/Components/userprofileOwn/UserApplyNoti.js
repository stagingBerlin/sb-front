import React, {useState} from 'react'
import DeleteButton from '../utilities/DeleteButton'
import AvatarImg from '../utilities/AvatarImg'
import { Link } from "react-router-dom"


export default function UserApplyNoti({
    id,
    appliedProject,
    status,
    readInitiator,
    readReceiver,
    updatedAt,
    createdAt,
    initialMessage,
    replyMessage,
    toUserAvatar,
    handleDeleteInitiator
}) {

    const [ showMessage, setShowMessage ] = useState(false)
    
    const handleShowMessage = () => {
        setShowMessage(!showMessage)
    }

    return (
        <div className="notification">
                    <div className="notification__top">
                        <DeleteButton
                            id={id}
                            fontSize="2" 
                            transformScale="1.2"
                            color="#93291e" 
                            colorHover="#ed213a"
                            handleClick={handleDeleteInitiator}
                        />
                    </div>

                    <div className="notification__info-box">
                        <div className="notification__info-box--data">
                            <div className="notification__data">
                                <h2>
                                    Applied Project:&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link to={`/account/allprojects/${appliedProject._id}`}>
                                        {appliedProject.title}
                                    </Link>
                                
                                </h2> 
                            </div>
                        </div>
                        <div className="notification__info-box--status">
                            <div className="notification__data">
                                <h2 className="notification__status">
                                    Status:&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span 
                                        className={`notification__status--${status}`}
                                    >{status.toUpperCase()}
                                    </span>
                                </h2> 
                            </div>
                        </div>
                    </div>

                    <div className="notification__message-box--container">
                        <button 
                            onClick={handleShowMessage} 
                            className="notification__message--open"
                        >{!showMessage ? "Show" : "Hide"} Messages <i className={!showMessage ? "far fa-caret-square-down": "far fa-caret-square-up"}></i></button>
                        
                    
                    {
                        !showMessage ?
                        <></>
                        :
                        <div className="notification__message-box">

                        <div className="notification__message--to-user">
                                <div className="notification__message--container">
                                    <div className="notification__message--to-user-text">
                                        <p>{initialMessage}</p>
                                    </div>
                                    <div className="notification__message--time">
                                    <p>{new Date(createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        
                                    </div>
                                </div>
                            </div>

                            {
                                status === 'pending' ?
                                <></>
                                :
                                <div className="notification__message notification__message--from-user">
                                    <div className="notification__message--from-user-avatar">
                                        <AvatarImg 
                                            large="4"
                                            image={toUserAvatar}
                                        />
                                    </div>

                                    <div className="notification__message--container">
                                        <div className="notification__message--from-user-text">
                                            <p>{replyMessage}</p>
                                        </div>
                                        <div className="notification__message--time">
                                            <p>{new Date(updatedAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        </div>
                                    </div>
                                </div>
                            }

                            
                        </div>

                    }
                    </div>
                    
                </div>
    )
}
