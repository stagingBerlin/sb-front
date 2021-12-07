import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../context/UserContext.js'
import { updateOwnProject } from '../../helpers/apiCalls.js'
import JobOfferCard from './JobOfferCard'
import UpdateButton from '../utilities/UpdateButton'
import AddJobButton from '../utilities/AddJobButton'
import AddProjectDetail from './AddProjectDetail'
import AddPicture from '../utilities/AddPicture'
import ImageBox from './ImageBox'

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
    setNewProject,
}) {

    const { viewProject, setViewProject, projects, setProjects, ownProjects,setOwnProjects } = useContext(UserContext)

    const [ showCreateJob, setShowCreteJob ] = useState(false)

    const [ newTitle, setNewTitle ] = useState({title: newProject ? newProject.title : ""})
    const [ newAuthorship, setNewAuthorship ] = useState({authorship:  newProject ? newProject.authorship : ""})
    const [ newDescription, setNewDescription ] = useState({description: newProject ? newProject.description : ""})

    const [ jobOffers, setJobOffers ] = useState([])

    const [ showPicture, setShowPicture ] = useState( false )
    const [ popupPicture, setPopupPicture ] = useState("")

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
            
            if(newResp.error){
                console.log(newResp.error);
                return;
            }

            setNewProject(newResp)

            const updated = viewProject.map(item =>  
                item._id === newResp._id ?
                newResp
                :
                item
            )

            const updated2 = projects.map(item =>  
                item._id === newResp._id ?
                newResp
                :
                item
            )

            const updated3 = ownProjects.map(item =>  
                item._id === newResp._id ?
                newResp
                :
                item
            )
            setViewProject(updated)
            setProjects(updated2)
            setOwnProjects(updated3)

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

    const handlePopup = (e) => {
        e.preventDefault();
        setShowCreteJob(true)
    }

    const handleShowImage = (e) => {
        setShowPicture(true)
        setPopupPicture(e.target.id)
    }

    const handleClosePicture = (e) => {
        if (e.target.contains(e.target)) {
            setShowPicture(false)
        }
    }

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


    const displayImages = () => {
        return newProject.images.map( item => {
            return item === "" ?
            ""
            :
            <ImageBox
                image={item}
                key={item}
                handleClick={handleShowImage}
            />
        })
    }
    
   
    return (
        <div className="project-view">
            {
                showPicture ? 
                <div className="popup"  onClick={handleClosePicture}>
                    <img 
                        src={popupPicture}
                        className="popup__image" 
                        // style={{width: "50%",  
                        // border: "1px solid white", }} 
                        alt="theater picture" 
                    />
                </div>
                :
                <></>
            
            }
            {
                showCreateJob ?
                <div className="popup">
                    <div className="create-project-form">
                        <AddProjectDetail 
                            newProject={newProject}
                            setNewProject={setNewProject}
                            setShowCreteJob={setShowCreteJob}
                        />
                    </div>
                </div>
                :
                <></>

            }
            
            <div className="card">
                <div className="card__picture--addPicture">
                    {
                        newProject ? 
                        <AddPicture
                            color="white"
                            fontSize="4" // fontSize in rem
                            transformScale="1.2"
                            id={newProject._id}
                            setNewProject={setNewProject}
                        />
                        :
                        <></>
                    }
                </div>
                <div 
                    className="card__picture" 
                >
                    {
                        newProject ? 
                        displayImages()
                        :
                        <></>
                    }
                </div>

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
                            <h1 className="job-card__heading">
                                { 
                                    newProject ? 
                                    newProject.authorship 
                                    : 
                                    "Who owns the intellectual property of this project?, add it in the form please." 
                                }
                            </h1>
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
                            <div className="card__jobList--add-job">
                                <AddJobButton 
                                    fontSize="3.5" 
                                    transformScale="1.1"
                                    color="black"
                                    colorHover="#48fb47"
                                    handleClick={handlePopup}
                                />
                            </div>

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

