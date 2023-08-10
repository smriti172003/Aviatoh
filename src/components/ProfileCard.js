import React from 'react';
import { primarySilverColour } from '../App';

function ProfileCard(props) {
    const { email } = props;
    return (
        <div style={{width: '90%', padding: '15px'}}>
            <div style={{borderBottom: '0px solid ' + 'rgb(210, 210, 210)', display: 'flex', justifyContent: 'space-between', paddingBottom: '0px', alignItems: 'center'}}>
                <div style={{display: 'flex', alignItems: 'center'}}><i className='fas fa-user-circle' style={{fontSize: '18px', color: 'white', cursor: 'pointer', backgroundColor: 'silver', borderRadius: '50%', padding: '3px'}}></i> &nbsp; {email?.split('@')[0]}</div>
            </div>
            <hr/>
                <div style={{backgroundColor:primarySilverColour, height: '20vh'}}>
                   <br/>
                   <br/> 
                   Progress Report 
                </div>
        </div>
    );
}

export default ProfileCard;