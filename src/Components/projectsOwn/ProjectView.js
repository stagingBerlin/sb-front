import React, { useState, useEffect } from 'react'
import { updateOwnProject } from '../../helpers/apiCalls.js'
import JobOfferCard from './JobOfferCard'
import UpdateButton from '../utilities/UpdateButton'

const mountedTextArea = { 
    WebkitAnimation: "text-focus-in .8s cubic-bezier(0.550, 0.085, 0.680, 0.530) both",
	animation: "text-focus-in .8s cubic-bezier(0.550, 0.085, 0.680, 0.530) both"
};
const unmountedTextArea = {
    WebkitAnimation: "text-blur-out 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both",
    animation: "text-blur-out 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both"
};

export default function ProjectView({
    newProject,
    setNewProject
}) {

    const [ newTitle, setNewTitle ] = useState({title: newProject ? newProject.title : ""})
    const [ newAuthorship, setNewAuthorship ] = useState({authorship:  newProject ? newProject.authorship : ""})
    const [ newDescription, setNewDescription ] = useState({description: newProject ? newProject.description : ""})

    const [ jobOffers, setJobOffers ] = useState([])

    useEffect(()=> {
        setNewTitle({title: newProject ? newProject.title : ""})
        setNewAuthorship({authorship:  newProject ? newProject.authorship : ""})
        setNewDescription({description: newProject ? newProject.description : ""})

        setJobOffers(newProject ? newProject.jobList : [])
    }, [ newProject ]);
    
    const [ isTitleMounted, setIsTitleMounted ] = useState(false);
    const [ showInputTitle, setShowInputTitle ] = useState(false);

    const [ isAuthorshipMounted, setIsAuthorshipMounted ] = useState(false);
    const [ showInputAuthorship, setShowInputAuthorship ] = useState(false);
    
    const [ isDescriptionMounted, setIsDescriptionMounted ] = useState(false);
    const [ showInputDescription, setShowInputDescription ] = useState(false);

    const update = async (inputValue) => {
        try {
            const newResp = await updateOwnProject(newProject._id, inputValue)
            console.log(newResp);
            if(newResp.error){
                console.log(newResp.error);
                return;
            }

            setNewProject(newResp)
        } catch (error) {
            console.log(error);
        }
    }

    const updateTitle = () => {
        if(showInputTitle){  
            update(newTitle); 
            setNewTitle({title: ""})
        }
        setIsTitleMounted(!isTitleMounted)
        if(!showInputTitle) setShowInputTitle(true);
    }

    const updateAuthorship = () => {
        if(showInputAuthorship){  
            update(newAuthorship); 
            setNewAuthorship({authorship: ""})
        }
        setIsAuthorshipMounted(!isAuthorshipMounted)
        if(!showInputAuthorship) setShowInputAuthorship(true);
    }

    const updateDescription = () => {
        if(showInputDescription){  
            update(newDescription); 
            setNewDescription({description: ""})
        }
        setIsDescriptionMounted(!isDescriptionMounted)
        if(!showInputDescription) setShowInputDescription(true);
    }

    // console.log(jobOffers);
    const displayJobs = () => {
        return jobOffers
        // .sort((a, b) => a.job.title.localeCompare(b.job.title))
        .map(item => 
            <JobOfferCard 
                key={item._id}
                jobOfferId={item._id}
                title={item.job.title}
                jobId={item.job._id}
                jobDescription={item.jobDescription}
                participant={item.participant ? item.participant : ""}
                newProjectId={newProject._id}
                setNewProject={setNewProject}
            />
        )
    }
    
    return (
        <div className="project-view">
            <div className="card">
                <div className="card__picture"></div>
                <div className="card__updateTitle">
                    {
                        newProject ? 
                        <UpdateButton
                            color="white"
                            fontSize="2" // fontSize in rem
                            transformScale="1.2"
                            // colorHover
                            handleClick={updateTitle}
                        />
                        :
                        <></>
                    }
                </div>
                
                <h4 className="card__heading">

                {
                    showInputTitle ?
                    <input 
                        autoFocus
                        className="card__inputUpdateTitle"
                        type="text" 
                        onChange={(e) => setNewTitle({title : e.target.value})} 
                        value={newTitle.title}
                        style={isTitleMounted ? mountedTextArea : unmountedTextArea}
                        onAnimationEnd={() => { if (!isTitleMounted) setShowInputTitle(false)}}
                    />
                        :
                    <span className="card__heading-span">
                        { 
                            newProject ? 
                            newProject.title 
                            : 
                            'Add in the form the title of your project.'
                        }
                    </span>
                    
                }
                </h4>

                <div className="card__body">

                    <div className="card__section">
                        <div className="separator">CONCEPT</div>
                        <div className="card__updateAuthorship">
                        {
                            newProject ?
                            <UpdateButton
                                color="#333"
                                fontSize="1.8" // fontSize in rem
                                transformScale="1.2"
                                // colorHover="black"
                                handleClick={updateAuthorship}
                            />
                            :
                            <></>
                        }
                        </div>

                        { 
                            showInputAuthorship ?
                            <input 
                                type="text"
                                className="card__inputBody"
                                autoFocus
                                onChange={(e) => setNewAuthorship({authorship: e.target.value})}
                                value={newAuthorship.authorship}
                                style={isAuthorshipMounted ? mountedTextArea : unmountedTextArea}
                                onAnimationEnd={() => { if (!isAuthorshipMounted) setShowInputAuthorship(false)}}
                            />
                            :
                            <p className="card__text">
                                { 
                                    newProject ? 
                                    newProject.authorship 
                                    : 
                                    "Who owns the intellectual property of this project?, add it in the form please." 
                                }
                            </p>
                        }
                    </div>

                    <div className="card__section">
                        <div className="separator">DESCRIPTION</div>
                        <div className="card__updateDescription">
                        {
                            newProject ?
                            <UpdateButton
                                color="#333"
                                fontSize="1.8" // fontSize in rem
                                transformScale="1.2"
                                // colorHover
                                handleClick={updateDescription}
                            />
                            :
                            <></>
                        }
                        </div>

                        {
                            showInputDescription ?
                            <textarea 
                                rows="20" 
                                cols="50"
                                className="card__inputBody"
                                autoFocus
                                onChange={(e) => setNewDescription({description: e.target.value})}
                                value={newDescription.description}
                                style={isDescriptionMounted ? mountedTextArea : unmountedTextArea}
                                onAnimationEnd={() => { if (!isDescriptionMounted) setShowInputDescription(false)}}
                            />
                            :
                            <p className="card__text">
                                { 
                                    newProject ? 
                                    newProject.description 
                                    : 
                                    'Add a description about your Project, use the form please.' 
                                }
                            </p>
                        }
                    </div>

                    <div className="card__section">
                        <div className="separator">JOB OFFERS</div>
                        <div className="card__jobList">
                        {
                            jobOffers.length !== 0 ? 
                            displayJobs()
                            :
                            <p className="card__text">
                                After you added Title, Concept and description, add some job offers to your project.
                            </p>   
                        }
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    )
}

