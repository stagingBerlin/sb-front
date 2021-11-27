import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import DeleteButton from '../utilities/DeleteButton'
import AvatarImg from '../utilities/AvatarImg'
import UpdateButton from '../utilities/UpdateButton'
import AddButton from '../utilities/AddButton'
import InputSelectUser from '../utilities/InputSelectUser'
import BasicSelect from './BasicSelect'
import { updateItemJobList } from '../../helpers/apiCallsAddJob'


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

    useEffect(()=> {
        setNewJobDescription({jobDescription: jobDescription})
    }, [jobDescription])
    
    const [ showSelectJob, setShowSelectJob ] = useState(false)
    const [ isJobSelectMounted, setIsJobSelectMounted ] = useState(false);

    const [ showJobDescription, setShowJobDescription ] = useState(false)
    const [ isJobDescriptionMounted, setIsJobDescriptionMounted ] = useState(false);
    
    // event to get jobId from BasicSelect component
    const handleChangeJob = (e) => {
        setInputJob(e.target.value);
        setNewJob({ job: e.target.value })
    };
    
    const updateSlots = async (newData) => {
        try {
            const resApi = await updateItemJobList(newProjectId, jobOfferId, newData)
            console.log(resApi);
            if(resApi.error) {
                console.log(resApi.error);
                return
            }
            setNewProject(resApi)
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
                    />
                </div>
                <div className="job-card__participant">
                    <div className="job-card__participant--add">
                        <AddButton
                            fontSize="7" 
                            transformScale="1.1"
                            color="white"
                            colorHover="#48fb47"
                        />
                    </div>
                </div>
            </div>
        </div>  
    )
}
