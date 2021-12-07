import React, { useState, useEffect, useContext } from 'react'
import Notification from './Notification'
import UserApplyNoti from './UserApplyNoti'
import { getNotifications, updateNotification } from '../../helpers/apiCalls'
import { addParticipant } from '../../helpers/apiCallsAddJob'
import { UserContext } from '../../context/UserContext'


export default function NotificationsBox() {

    const { user } = useContext(UserContext)
    
    const [ fromNoti, setFromNoti ] = useState([])
    const [ toNoti, setToNoti ] = useState([])

    const [ otherApply, setOtherApply ] = useState("show")
    const [ userApply, setUserApply ] = useState(!user.isHiring ? "show" : "hide")

    const [ replyMessage, setReplyMessage ] = useState("")

    const allNotifications = async () =>{
        try {
            const notis = await getNotifications()
            if(notis.error){
                console.log(notis.error);
                return
            }
           
            const fromUserNotis = notis.filter(item => item.fromUser._id === user._id) 
            const toUserNotis = notis.filter(item => item.toUser._id === user._id) 
            
            setFromNoti(fromUserNotis)
            setToNoti(toUserNotis)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        allNotifications()
    },[])


    const handleOtherApply = () => {
        setOtherApply("show")
        setUserApply("hide")
    }

    const handleUserApply = () => {
        setOtherApply("hide")
        setUserApply("show")
    }

    const handleDeleteInitiator = async (e) => {
        const id = e.target.id
        const data = {
            readInitiator: true
        }
        const respApi = await updateNotification(id, data);
        const updated = fromNoti.map(item => {
            return item._id === respApi._id ?
            respApi
            :
            item
        })
        setFromNoti(updated)
    }

    const handleDeleteReceiver = async (e) => {
        const id = e.target.id
        const data = {
            readReceiver: true
        }

        const respApi = await updateNotification(id, data);
        const updated = toNoti.map(item => {
            return item._id === respApi._id ?
            respApi
            :
            item
        })
        setToNoti(updated)
    }

    const handleReplyMessage = async (newStatus, notiId, appliedProjectId, jobSlotId, fromUserId) => {
       const data = {
           status: newStatus,
           replyMessage
       }

        if(newStatus === "accepted"){
            const newParticipant = await addParticipant(appliedProjectId, jobSlotId, fromUserId) 
        }

        const respApi = await updateNotification(notiId, data)
         
        const updated = toNoti.map(item => {
            return item._id === respApi._id ?
            respApi
            :
            item
        })

        setToNoti(updated)
        setReplyMessage("")
    }
    
    const toNotiDisplay = () => {
        return toNoti.map(item => {
            return item.readReceiver ?
                ""
                :
                <Notification 
                    key={item._id} 
                    id={item._id}
                    fromUserId={item.fromUser._id}
                    username={item.fromUser.username} 
                    name={item.fromUser.name}
                    appliedProject={item.projectId} 
                    status={item.status}
                    readInitiator={item.readInitiator}
                    readReceiver={item.readReceiver}
                    updatedAt={item.updatedAt}
                    createdAt={item.createdAt}
                    avatar={item.fromUser.avatar}
                    initialMessage={item.initialMessage}
                    replyMessage={item.replyMessage}
                    jobSlotId={item.jobSlotId}
                    job={item.job}
                    jobDescription={item.jobDescription}
                    setReplyMessage={setReplyMessage}
                    handleReplyMessage={handleReplyMessage}
                    handleDeleteReceiver={handleDeleteReceiver}
                />
            }
        )
    }

    const fromNotiDisplay = () => {
        return fromNoti.map(item => {
            return item.readInitiator ?
                ""
                :
            <UserApplyNoti 
                key={item._id} 
                id={item._id}
                // username={item.fromUser.username} 
                // name={item.fromUser.name}
                appliedProject={item.projectId} 
                status={item.status}
                readInitiator={item.readInitiator}
                readReceiver={item.readReceiver}
                updatedAt={item.updatedAt}
                createdAt={item.createdAt}
                toUserAvatar={item.toUser.avatar}
                initialMessage={item.initialMessage}
                replyMessage={item.replyMessage}
                handleDeleteInitiator={handleDeleteInitiator}
                job={item.job}
                jobDescription={item.jobDescription}
            />
        }
    )
    }

    return (
        <div className="notifications-box">
            <div className="notifications-box__tab-bar">
                {
                    user.isHiring ? 
                    <h1 
                        onClick={handleOtherApply} 
                        className={`notifications-box__tab notifications-box__tab--${otherApply}`
                    }>Applications to my Projects</h1>
                    :
                    <></>
                }
                <h1 
                    onClick={handleUserApply} 
                    className={`notifications-box__tab notifications-box__tab--${userApply}`}
                >My Applications</h1>
            </div>

            <div className="notifications-box__all-notifications">

            {
                !user.isHiring ? 
                fromNotiDisplay()
                :
                otherApply === "show" ?
                    toNotiDisplay()
                    :
                    fromNotiDisplay() 
            }
            </div>            
        </div>
    )
}
