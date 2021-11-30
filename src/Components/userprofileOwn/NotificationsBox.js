import React from 'react'
import DeleteButton from '../utilities/DeleteButton'
import AvatarImg from '../utilities/AvatarImg'

export default function NotificationsBox() {
    return (
        <div className="notifications-box">
            <div className="notification">
                <div className="notification__header">
                    <div className="notification__heading">
                        <h1 className="notification__heading--type">Application to your Project</h1>
                    </div>
                    <div className="notification__trash">
                    <DeleteButton
                        fontSize="2.4" 
                        transformScale="1.2"
                        color="#93291e" 
                        colorHover="#ed213a"
                        // handleClick={handleDeleteJob}
                    />
                    </div>
                </div>

                <div className="notification__info-box">
                    <div className="notification__info-box--data">
                        <div className="notification__data">
                            <span>From:</span> 
                            <AvatarImg 
                            large="7"
                            image={"https://media.istockphoto.com/photos/woman-hacker-face-picture-id1147603755?b=1&k=20&m=1147603755&s=170667a&w=0&h=OlPOOjxOqBOlRCIs0tP3r1WLJ6o99anuBROeb6QihwI="}
                            />
                            <h2>Username (name)</h2>
                        </div>
                        <div className="notification__data">
                            <span>Applied Project:</span>
                            <a href="#">Link to the project</a>
                        </div>
                    </div>
                    <div className="notification__info-box--status">
                        <div className="notification__data">
                            <span className="notification__status">Status:</span> 
                            <p>Pending</p>
                        </div>
                    </div>
                </div>
                <div className="notification__message-box">
                    <div className="notification__message--from-user">
                        <AvatarImg 
                            large="5"
                            image={"https://media.istockphoto.com/photos/woman-hacker-face-picture-id1147603755?b=1&k=20&m=1147603755&s=170667a&w=0&h=OlPOOjxOqBOlRCIs0tP3r1WLJ6o99anuBROeb6QihwI="}
                        />
                        <div className="notification__message">
                            <p>Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante Mensaje del aplicante</p>
                        </div>
                    </div>
                    <div className="notification__message--to-user">

                    </div>
                </div>
                <div className="notification__acction-box">
                    <button>Accept</button> <button>Reject</button>
                </div>
            </div>
            
        </div>
    )
}
