import React, { useEffect, useState } from 'react';
import FeedCard from './FeedCard';
import { verifiedProjectsCollection, getAllDocuments, projectsCollection } from '../db';
import { SearchLoader } from './Loaders';

function Feed(props) {

    const [ projects, setProjects ] = useState(null);

    useEffect(()=>{
        if(props.email){
            Promise.resolve(getAllDocuments(verifiedProjectsCollection)).then(res => {
    
                const arr = [];
                res.forEach(i => { 
                    if(i.data()?.deleted != true){
                        arr.push({
                            email: i.id.split('emailproject')[0],
                            projectTitle: i.id.split('emailproject')[1],
                            preview: i.data().preview,
                            type: i.data().type
                        });
                    }
                });
                setProjects(arr);
            }).catch((err)=>{
                alert(err.message);

            });   
        }
       
    }, [props.email]);

    
    return (
        <div align="center">
            {
                projects ? projects.length < 1 ? null : projects.map(project => {
                    return <><FeedCard userEmail={props.email} projectTitle={project.projectTitle} email={project.email} preview={project.preview} type={project.type} />
                    <hr/>
                    </>
                }) : <SearchLoader />
            }
        </div>
    );
}

export default Feed;