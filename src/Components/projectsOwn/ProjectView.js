import React, { useState } from 'react'
import UpdateButton from '../utilities/UpdateButton'
import { updateOwnProject } from '../../helpers/apiCalls.js'


export default function ProjectView({
    newProject,
    setNewProject
}) {

    const [ newTitle, setNewTitle ] = useState(newProject.title)
    const [ showInpTitle, setShowImpTitle ] = useState(false)

    const update = async () => {
        try {
            const newResp = await updateOwnProject(newProject._id, {title: newTitle})
            setNewProject(newResp)
        } catch (error) {
            console.log(error);
        }
    }

    const handleTitle = (e) => {
        if(showInpTitle){  
            update(); 
        }
        setShowImpTitle(!showInpTitle) 
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
                            fontSize="2.5" // fontSize in rem
                            transformScale="1.2"
                            // colorHover
                            handleClick={handleTitle}
                        />
                        :
                        <></>
                    }
                    
                </div>
                
                <h4 className="card__heading">

                {
                    showInpTitle ?
                    <input 
                        className="card__inputUpdateTitle"
                        type="text" 
                        onChange={(e) => setNewTitle(e.target.value)} 
                        value={newTitle}
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
                        <p className="card__text">
                            { 
                                newProject ? 
                                newProject.authorship 
                                : 
                                "Who owns the intellectual property of this project?, add it in the form please." 
                            }
                        </p>
                    </div>

                    <div className="card__section">
                        <div className="separator">DESCRIPTION</div>
                        <p className="card__text">
                            { 
                                newProject ? 
                                newProject.description 
                                : 
                                'Add a description about your Project, use the form please.' 
                            }
                        </p>
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

