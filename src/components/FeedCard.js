import React, { useEffect, useState } from 'react';
import { primaryBlueColour, primaryGreenColour } from '../App';
import { getDocument, topicsCollection, updateOrCreateDocument, usersCollection } from '../db';
import toaster from './toaster';
import { Link } from 'react-router-dom';
import { SearchLoader } from './Loaders';
import { FieldValue } from 'firebase/firestore';

function FeedCard(props) {
    const { email, projectTitle, preview, type, userEmail } = props;
    const [ prev, setPrev ] = useState(null);
    const [ isFollower, setIsFollower ] = useState(null);
    const [ refresh, setrefresh ] = useState(true);
    useEffect(()=>{
        if(preview){
            getDocument(topicsCollection, preview).then(res => {
                setPrev(res.data().data);
            }).catch(err=>{
                toaster(-1, err.message);
            })
        }
       
    }, [preview]);

    useEffect(()=>{
        if(email && userEmail){
            getDocument(usersCollection, userEmail).then((res) => {
                if(res.data().following?.includes(email)) {
                    setIsFollower(true);
                } else {
                    setIsFollower(false);
                }
            })
        }
    }, [email, userEmail, refresh]);

    return (
        <div style={{color: 'rgb(100, 100 ,100)', width: '90%', border: '0px solid ' + 'rgb(210, 210, 210)', padding: '15px 15px', borderRadius: '5px', marginBottom: '30px'}}>
            <div style={{borderBottom: '0px solid ' + 'rgb(210, 210, 210)', display: 'flex', justifyContent: 'space-between', paddingBottom: '0px', alignItems: 'center'}}>
                <div style={{display: 'flex', alignItems: 'center'}}><i className='fas fa-user-circle' style={{fontSize: '18px', color: 'white', cursor: 'pointer', backgroundColor: 'silver', borderRadius: '50%', padding: '3px'}}></i> &nbsp; {email.split('@')[0]}</div>
                { !isFollower && <div style={{cursor: 'pointer'}}
                onClick={()=>{
                    getDocument(usersCollection, userEmail).then((res) => {
                        let followingArr = res.data().following;
                        if(!followingArr){
                            followingArr = [];
                        }
                        updateOrCreateDocument(usersCollection, userEmail, {
                            following: [...followingArr, email]
                        }).then((res)=>{
                            toaster(1, 'You are now following ' + email);
                            setrefresh(!refresh);
                        })
                        .catch((err)=>{
                            toaster(-1, err.message);
                        })
                    })
                }}
                > <i className='fas fa-user-plus' style={{cursor: 'pointer'}}></i> &nbsp;Follow &nbsp;</div>}

                {
                    isFollower && <div><i className='fas fa-user-check' style={{cursor: 'pointer', color: 'skyblue'}}></i> Following&nbsp;</div>
                }
            </div>
            <br/>
            <div style={{backgroundColor: ' ', padding: '0px', display: 'flex', justifyContent: 'space-between', width: '100%'}} align="left">
                <div>{type} : {projectTitle.toUpperCase()}</div>
                <div>Status : <i className='far fa-check-circle' style={{color: primaryGreenColour(1)}}></i> Completed</div>
            </div>
            <br/>
            {prev ? <div align="left" className='ProjPrevDiv' dangerouslySetInnerHTML={{__html: prev}} style={{maxHeight: '70vh', overflow: 'scroll', all: 'revert', textAlign: 'left'}}>
                
            </div> : <SearchLoader />}
            <div style={{borderTop: '1px solid ' + 'rgb(210, 210, 210)', display: 'flex', justifyContent: 'space-between', paddingTop: '15px'}}>
              
                <div align="left" style={{width: '33%'}}><b><i className='far fa-comments' style={{color: primaryBlueColour, fontSize: '16px'}}></i></b> Comment</div>
                <Link target={`/project/view/${email}/${projectTitle}`} to={`/project/view/${email}/${projectTitle}`} align="right" style={{width: '65%', textDecoration: 'none', cursor:'pointer', color: 'rgb(100, 100 ,100)'}}>
                    <i className='fas fa-external-link-alt' style={{color: primaryBlueColour}}></i>
                    &nbsp;
                Visit Documentation</Link>
            </div>
        </div>
    );
}

export default FeedCard;