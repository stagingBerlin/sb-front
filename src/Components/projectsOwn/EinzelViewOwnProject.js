import React, { useEffect, useState } from 'react'
import ProjectView from './ProjectView'
import { getOwnProject } from '../../helpers/apiCalls'

const EinzelViewOwnProject = ({id}) => {

    const [ projectToShow, setProjectToShow ] = useState()

    const getViewProject = async () => {
        try {
            const projectApi = await getOwnProject(id)
            if(projectApi.error){
                console.log(projectApi.error);
                return
            }
            setProjectToShow(projectApi)            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getViewProject()
        // eslint-disable-next-line
    }, [])

    return (
        <div style={{padding:".7rem"}}>
            <ProjectView
                newProject={projectToShow}
                setNewProject={setProjectToShow}
             />
        </div>
    )
}

export default EinzelViewOwnProject
