import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import DeleteButton from '../utilities/DeleteButton'
import AvatarImg from '../utilities/AvatarImg'
import UpdateButton from '../utilities/UpdateButton'
import AddButton from '../utilities/AddButton'
import InputSelectUser from '../utilities/InputSelectUser'
import BasicSelect from './BasicSelect'
import { updateItemJobList,  deleteItemJobList, addParticipant } from '../../helpers/apiCallsAddJob'


const mountedTextArea = { 
    WebkitAnimation: "text-focus-in .8s cubic-bezier(0.550, 0.085, 0.680, 0.530) both",
	animation: "text-focus-in .8s cubic-bezier(0.550, 0.085, 0.680, 0.530) both"
};
const unmountedTextArea = {
    WebkitAnimation: "text-blur-out 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both",
    animation: "text-blur-out 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both"
};


export default function JobOfferCard({
    title, 
    jobDescription, 
    participant, 
    setNewProject, 
    newProjectId,
    jobId,
    jobOfferId
}) {

    const { usersdb, jobs } = useContext(UserContext)
    // const [participants, setparticipants] = useState([])

    const filterByJob = usersdb.filter(user => {
        const filteredUser = user.profession.filter(job => job.title === title) 
        return filteredUser.length !== 0
    })

    // state to handle job Id in  BasicSelect component
    const [inputJob, setInputJob] = useState(jobId);
    const [ newJob, setNewJob ] = useState({ job: "" })

    const [ newJobDescription, setNewJobDescription ] = useState({jobDescription: jobDescription})
    const [ newParticipant, setNewParticipant ] = useState(participant)

    useEffect(()=> {
        setNewJobDescription({jobDescription: jobDescription})
        setNewParticipant(participant)
    }, [jobDescription, participant])
    // console.log(newParticipant);

    const [ showSelectJob, setShowSelectJob ] = useState(false)
    const [ isJobSelectMounted, setIsJobSelectMounted ] = useState(false);

    const [ showJobDescription, setShowJobDescription ] = useState(false)
    const [ isJobDescriptionMounted, setIsJobDescriptionMounted ] = useState(false);

    const [ showAction, setShowAction ] = useState(participant ? "avatar" : "add")
    
    // event to get jobId from BasicSelect component
    const handleChangeJob = (e) => {
        setInputJob(e.target.value);
        setNewJob({ job: e.target.value })
    };
    
    const updateSlots = async (newData) => {
        try {
            const resApi = await updateItemJobList(newProjectId, jobOfferId, newData)
            if(resApi.error) {
                console.log(resApi.error);
                return
            }
            setNewProject(resApi)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteJob = async () => {
        try {
            const deleted = await deleteItemJobList(newProjectId, jobOfferId)
            // console.log(deleted);
            if(deleted.error) {
                console.log(deleted.error);
                return
            }
            setNewProject(deleted)
        } catch (error) {
            console.log(error);
        }
    }

    const hireParticipant = async (participantId) => {
        try {
            const newParticipant = await addParticipant(newProjectId, jobOfferId, participantId)
            if(newParticipant.error) {
                console.log(newParticipant.error);
                return
            }
            setNewProject(newParticipant)
        } catch (error) {
            console.log(error);
        }
    }
    
    const updateJob = () =>{
        if(showSelectJob){
            updateSlots(newJob)
            setNewJob({ job: "" })
        }
        setIsJobSelectMounted(!isJobSelectMounted)
        if(!showSelectJob) setShowSelectJob(true);
    }

    const updateJobDescription = () => {
        if(showJobDescription){
            updateSlots(newJobDescription)
            setNewJobDescription({ jobDescription: ""})
        }
        setIsJobDescriptionMounted(!isJobDescriptionMounted)
        if(!showJobDescription) setShowJobDescription(true);
    }

    const handleDeleteJob = () => {
        deleteJob()
    }

    const addButtonEvent = (e) => {
        setShowAction("input")
    }

    const cancelAndBacktoAdd = () => {
        setShowAction("add")
    }

    const handleParticipantId = (e) => {
        hireParticipant(e.currentTarget.id)
        setShowAction("avatar")
    }

    return (
        <div className="job-card">
            <div className="job-card__info">
                <div className="job-card__updateJob">
                    <UpdateButton
                        fontSize="1.5" 
                        transformScale="1.2"
                        color="#333"
                        handleClick={updateJob}
                    />
                    {
                        showSelectJob ?
                        <div
                            style={isJobSelectMounted ? mountedTextArea : unmountedTextArea}
                            onAnimationEnd={() => { if (!isJobSelectMounted) setShowSelectJob(false)}}
                        >
                            <BasicSelect
                                jobs={jobs}
                                inputJob={inputJob}
                                handleChangeJob={handleChangeJob}
                            />

                        </div>
                        :
                        <h1 className="job-card__heading">{title}</h1>
                    }
                </div>
                <div className="job-card__updateDescription">
                    <UpdateButton
                        fontSize="1.5" 
                        transformScale="1.2"
                        color="#333"
                        handleClick={updateJobDescription}
                    />

                    {
                        showJobDescription ?
                        <textarea 
                                rows="20" 
                                cols="50"
                                className="card__inputBody"
                                autoFocus
                                onChange={(e) => setNewJobDescription({jobDescription: e.target.value})}
                                value={newJobDescription.jobDescription}
                                style={isJobDescriptionMounted ? mountedTextArea : unmountedTextArea}
                                onAnimationEnd={() => { if (!isJobDescriptionMounted) setShowJobDescription(false)}}
                            />
                            :
                            <p className="job-card__text">
                                {jobDescription}
                            </p>
                    }
                </div>              
            </div>
            <div className="job-card__avatar">
                <div className="job-card__trash">
                    <DeleteButton
                        fontSize="2" 
                        transformScale="1.2"
                        color="white"
                        handleClick={handleDeleteJob}
                    />
                </div>
                <div className="job-card__participant">
                        {
                            showAction === "add" ?
                            <div className="job-card__participant--add">
                                <AddButton
                                    fontSize="7" 
                                    transformScale="1.1"
                                    color="white"
                                    colorHover="#48fb47"
                                    handleClick={addButtonEvent}
                                />
                            </div>
                            :
                            showAction === "input" ?
                            <div className="job-card__participant--input">
                                    <h1>Choose Participant</h1>
                                    <button onClick={cancelAndBacktoAdd}>Cancel</button>
                                    <InputSelectUser 
                                        usersToChoose={filterByJob}
                                        getId={handleParticipantId}
                                    />
                            </div>
                            :
                            <div className="job-card__participant--avatar">
                                <AvatarImg 
                                    large="15"
                                    image={newParticipant.avatar}
                                />
                            </div>
                        }
                    </div>
            </div>
        </div>  
    )
}

