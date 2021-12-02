import React from 'react'
import DeleteButton from '../utilities/DeleteButton'
import AvatarImg from '../utilities/AvatarImg'

export default function Notification() {
    return (
        <div className="notification">
                    <div className="notification__top">
                        <DeleteButton
                            fontSize="2" 
                            transformScale="1.2"
                            color="#93291e" 
                            colorHover="#ed213a"
                            // handleClick={handleDeleteJob}
                        />
                    </div>

                    <div className="notification__info-box">
                        <div className="notification__info-box--data">
                            <div className="notification__data"> 
                                <AvatarImg 
                                    large="7"
                                    image={"https://media.istockphoto.com/photos/woman-hacker-face-picture-id1147603755?b=1&k=20&m=1147603755&s=170667a&w=0&h=OlPOOjxOqBOlRCIs0tP3r1WLJ6o99anuBROeb6QihwI="}
                                />
                                <h2>Username&nbsp;&nbsp;&nbsp;&nbsp;(name)</h2>
                            </div>
                            <div className="notification__data">
                                <h2>Applied Project:&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">Link to the applied project</a></h2> 
                            </div>
                        </div>
                        <div className="notification__info-box--status">
                            <div className="notification__data">
                                <h2 className="notification__status">Status:&nbsp;&nbsp;&nbsp;&nbsp;<span className="notification__status--pending">Pending</span></h2> 
                                {/* <h2 className="notification__status">Status:&nbsp;&nbsp;&nbsp;&nbsp;<span className="notification__status--rejected">Rejected</span></h2>  */}
                                {/* <h2 className="notification__status">Status:&nbsp;&nbsp;&nbsp;&nbsp;<span className="notification__status--accepted">Accepted</span></h2>  */}
                            </div>
                        </div>
                    </div>

                    <div className="notification__message-box--container">
                        <button className="notification__message--open">Messages <i class="far fa-caret-square-down"></i></button>
                        <i class="far fa-caret-square-up"></i>
                        
                    
                    
                    <div className="notification__message-box">

                        <div className="notification__message notification__message--from-user">
                            <div className="notification__message--from-user-avatar">
                                <AvatarImg 
                                    large="4"
                                    image={"https://media.istockphoto.com/photos/woman-hacker-face-picture-id1147603755?b=1&k=20&m=1147603755&s=170667a&w=0&h=OlPOOjxOqBOlRCIs0tP3r1WLJ6o99anuBROeb6QihwI="}
                                />
                            </div>

                            <div className="notification__message--container">
                                <div className="notification__message--from-user-text">
                                    <p>Men del aplinte Mensaje  Mensaje del aplsdvsvsddvsante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante</p>
                                </div>
                                <div className="notification__message--time">
                                    <p>at monday bla bla bla</p>
                                    
                                </div>
                            </div>

                        </div>
                        {/* <div className="notification__message--to-user">
                            <div className="notification__message--container">
                                <div className="notification__message--to-user-text">
                                    <p>Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante</p>
                                </div>
                                <div className="notification__message--time">
                                    <p>at monday bla bla bla</p>
                                    
                                </div>
                            </div>
                        </div> */}
                    </div>
                    </div>
                    <div className="notification__acction-buttons">
                        <button className="button-primary">Accept</button> <button className="button-primary">Reject</button>
                    </div>
                </div>
    )
}
