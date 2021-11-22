import React from 'react'

export default function ProjectView({
    newProject,
    setNewProject
}) {
    return (
        <div className="project-view">
            <div className="card">
                <div className="card__picture"></div>
                
                <h4 className="card__heading">
                    <span className="card__heading-span">
                        { newProject ? newProject.title : 'Create a project now!!!'}
                    </span>
                </h4>
                <div className="card__body">

                    
                    <h6 className="card__concept">
                        Concept:
                        <span className="card__concept-span">{ newProject ? newProject.authorship : "Who is the creator of this project?" }</span>
                    </h6>
                    

                    <div className="card__description">
                        <h2 className="card__description--heading">Description:</h2>
                        <p className="card__description--text">
                            { newProject ? newProject.description : 'Add a description to your Project' }
                        </p>
                    </div>

                    <h2 className="card__description--heading">Job Offers:</h2>
                    <div className="card__jobList">
                        {
                            newProject && newProject.jobList.length !== 0 ? 
                            newProject.jobList.map((item, i)=> {
                                return <>
                                <div className="card__jobContainer" key={i}>
                                    <h2 className="card__description--heading">
                                        Job: <span className="card__job-span">{item.job.title}</span> 
                                    </h2>
                                    <h2 className="card__description--heading">Description:</h2>
                                    <p className="card__description--text">
                                        {item.jobDescription}
                                    </p>
                                </div>
                                </>
                            })
                            :
                            "No Offers for this project"
                        }

                        
                        
                    </div>

                </div>
            </div>


        </div>
    )
}

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum amet atque culpa sunt sint recusandae natus reprehenderit incidunt odit et aperiam, nam modi quae vel facere mollitia id non repellat? Aperiam, temporibus perspiciatis cumque sed, veritatis ullam suscipit cum quis laboriosam voluptate deserunt expedita laudantium delectus explicabo quas blanditiis quasi minus eius sint! Dolore assumenda natus vitae voluptas laboriosam hic, eius tempora in molestias alias, vero cum voluptate nesciunt, autem necessitatibus delectus. Distinctio libero, molestias aperiam omnis ad, autem voluptatem, accusantium harum pariatur velit officiis voluptates vitae nulla excepturi consequatur quis possimus. Consectetur, cumque harum. Dignissimos cumque magni qui eaque veritatis ipsam sequi sint minus laborum totam odio in consequatur maxime tenetur nemo, perferendis, saepe voluptatem quasi dolor? Quos eos quam, sint facere ut quibusdam illum minus. Eos, magnam itaque illo quaerat magni accusamus ducimus, consequuntur hic distinctio ipsum voluptates a maxime quis temporibus error totam cupiditate amet deleniti. Facere autem quia accusamus, quibusdam, cupiditate deserunt veniam culpa distinctio nihil temporibus tempore ea. Perspiciatis odio molestiae voluptatibus distinctio excepturi ratione iure reprehenderit cum recusandae quia sint ea fuga itaque pariatur labore asperiores, vero nobis laborum, in harum illum soluta, eligendi blanditiis! Nesciunt, libero aliquam optio repudiandae officiis unde. Aliquam, qui!

