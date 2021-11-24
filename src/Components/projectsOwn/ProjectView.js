import React, { useState, useEffect } from 'react'
import UpdateButton from '../utilities/UpdateButton'
import { updateOwnProject } from '../../helpers/apiCalls.js'

const mountedStyle = { 
    animation: "0.8s slideIn", 
    // animationTimingFunction: "linear" 
};
const unmountedStyle = {
  animation: "0.8s slideOut",
//   animationTimingFunction: "linear", 
  animationFillMode: "forwards"
};

const mountedTextArea = { 
    webkitAnimation: "text-focus-in .8s cubic-bezier(0.550, 0.085, 0.680, 0.530) both",
	animation: "text-focus-in .8s cubic-bezier(0.550, 0.085, 0.680, 0.530) both"
};
const unmountedTextArea = {
    webkitAnimation: "text-blur-out 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both",
    animation: "text-blur-out 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both"
};

export default function ProjectView({
    newProject,
    setNewProject
}) {
    
    const [ newTitle, setNewTitle ] = useState({title: newProject ? newProject.title : ""})
    const [ newAuthorship, setNewAuthorship ] = useState({authorship:  newProject ? newProject.authorship : ""})
    const [ newDescription, setNewDescription ] = useState({description: newProject ? newProject.description : ""})

    useEffect(()=> {
        setNewTitle({title: newProject ? newProject.title : ""})
        setNewAuthorship({authorship:  newProject ? newProject.authorship : ""})
        setNewDescription({description: newProject ? newProject.description : ""})
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
                        style={isTitleMounted ? mountedStyle : unmountedStyle}
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
                                // colorHover
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
                                style={isAuthorshipMounted ? mountedStyle : unmountedStyle}
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
                            newProject && newProject.jobList.length !== 0 ? 
                            newProject.jobList.map((item, i)=> {
                                return <>
                                <div className="card__jobContainer" key={i}>
                                    <div className="card__section">
                                        <div className="separator">Job</div>
                                        <p className="card__text">{item.job.title}</p>
                                    </div>
                                    <div className="card__section">
                                        <div className="separator">description</div>
                                        <p className="card__text">{item.jobDescription}</p>
                                    </div>
                                </div>
                                </>
                            })
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

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum amet atque culpa sunt sint recusandae natus reprehenderit incidunt odit et aperiam, nam modi quae vel facere mollitia id non repellat? Aperiam, temporibus perspiciatis cumque sed, veritatis ullam suscipit cum quis laboriosam voluptate deserunt expedita laudantium delectus explicabo quas blanditiis quasi minus eius sint! Dolore assumenda natus vitae voluptas laboriosam hic, eius tempora in molestias alias, vero cum voluptate nesciunt, autem necessitatibus delectus. Distinctio libero, molestias aperiam omnis ad, autem voluptatem, accusantium harum pariatur velit officiis voluptates vitae nulla excepturi consequatur quis possimus. Consectetur, cumque harum. Dignissimos cumque magni qui eaque veritatis ipsam sequi sint minus laborum totam odio in consequatur maxime tenetur nemo, perferendis, saepe voluptatem quasi dolor? Quos eos quam, sint facere ut quibusdam illum minus. Eos, magnam itaque illo quaerat magni accusamus ducimus, consequuntur hic distinctio ipsum voluptates a maxime quis temporibus error totam cupiditate amet deleniti. Facere autem quia accusamus, quibusdam, cupiditate deserunt veniam culpa distinctio nihil temporibus tempore ea. Perspiciatis odio molestiae voluptatibus distinctio excepturi ratione iure reprehenderit cum recusandae quia sint ea fuga itaque pariatur labore asperiores, vero nobis laborum, in harum illum soluta, eligendi blanditiis! Nesciunt, libero aliquam optio repudiandae officiis unde. Aliquam, qui!

