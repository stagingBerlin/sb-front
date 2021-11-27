import React, { useState, useEffect } from 'react'
import { updateOwnProject } from '../../helpers/apiCalls.js'
import JobOfferCard from './JobOfferCard'
import DeleteButton from '../utilities/DeleteButton'
import AvatarImg from '../utilities/AvatarImg'
import UpdateButton from '../utilities/UpdateButton'
import AddButton from '../utilities/AddButton'
import InputSelectUser from '../utilities/InputSelectUser'

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
                participant={item.participant}
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



                          
                            <div className="job-card">
                                <div className="job-card__info">
                                    <div className="job-card__updateJob">
                                        <UpdateButton
                                            fontSize="1.5" 
                                            transformScale="1.2"
                                            color="#333"
                                        />
                                        <h1 className="job-card__heading">Photographer</h1>
                                    </div>
                                    <div className="job-card__updateDescription">
                                        <UpdateButton
                                            fontSize="1.5" 
                                            transformScale="1.2"
                                            color="#333"
                                        />
                                        <p className="job-card__text">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium iure commodi, quidem molestias eos perferendis ullam totam tempore animi ut sit, corrupti tempora perspiciatis dolor doloremque neque accusamus reprehenderit recusandae assumenda molestiae ex beatae fugiat porro. Cumque reiciendis pariatur optio alias libero deleniti at incidunt ab inventore voluptates! Laborum, est!
                                            
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo nam aliquam consequuntur? Molestias sed harum alias at quam odio non, accusamus libero illo repellat quisquam, deserunt asperiores nam velit tenetur!
                                        </p>
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
                                        <div className="job-card__participant--input">
                                            <h1>Choose Participant</h1>
                                            <button>Cancel</button>
                                            <InputSelectUser />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="job-card">
                                <div className="job-card__info">
                                    <div className="job-card__updateJob">
                                        <UpdateButton
                                            fontSize="1.5" 
                                            transformScale="1.2"
                                            color="#333"
                                        />
                                        <h1 className="job-card__heading">Photographer</h1>
                                    </div>
                                    <div className="job-card__updateDescription">
                                        <UpdateButton
                                            fontSize="1.5" 
                                            transformScale="1.2"
                                            color="#333"
                                        />
                                        <p className="job-card__text">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium iure commodi, quidem molestias eos perferendis ullam totam tempore animi ut sit, corrupti tempora perspiciatis dolor doloremque neque accusamus reprehenderit recusandae assumenda molestiae ex beatae fugiat porro. Cumque reiciendis pariatur optio alias libero deleniti at incidunt ab inventore voluptates! Laborum, est!
                                            
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo nam aliquam consequuntur? Molestias sed harum alias at quam odio non, accusamus libero illo repellat quisquam, deserunt asperiores nam velit tenetur!
                                        </p>
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
                                        <div className="job-card__participant--avatar">
                                            <AvatarImg 
                                                large="15"
                                                image={'http://placeimg.com/640/480/people'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    )
}

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum amet atque culpa sunt sint recusandae natus reprehenderit incidunt odit et aperiam, nam modi quae vel facere mollitia id non repellat? Aperiam, temporibus perspiciatis cumque sed, veritatis ullam suscipit cum quis laboriosam voluptate deserunt expedita laudantium delectus explicabo quas blanditiis quasi minus eius sint! Dolore assumenda natus vitae voluptas laboriosam hic, eius tempora in molestias alias, vero cum voluptate nesciunt, autem necessitatibus delectus. Distinctio libero, molestias aperiam omnis ad, autem voluptatem, accusantium harum pariatur velit officiis voluptates vitae nulla excepturi consequatur quis possimus. Consectetur, cumque harum. Dignissimos cumque magni qui eaque veritatis ipsam sequi sint minus laborum totam odio in consequatur maxime tenetur nemo, perferendis, saepe voluptatem quasi dolor? Quos eos quam, sint facere ut quibusdam illum minus. Eos, magnam itaque illo quaerat magni accusamus ducimus, consequuntur hic distinctio ipsum voluptates a maxime quis temporibus error totam cupiditate amet deleniti. Facere autem quia accusamus, quibusdam, cupiditate deserunt veniam culpa distinctio nihil temporibus tempore ea. Perspiciatis odio molestiae voluptatibus distinctio excepturi ratione iure reprehenderit cum recusandae quia sint ea fuga itaque pariatur labore asperiores, vero nobis laborum, in harum illum soluta, eligendi blanditiis! Nesciunt, libero aliquam optio repudiandae officiis unde. Aliquam, qui!

