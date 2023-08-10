import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { primaryBlueColour } from '../App';


function toaster(level, message) {

    //level => -1, 0, 1    ====   error, info, success

    if(message == 'Missing or insufficient permissions.'){

        toast['info'](<div align="left"><div style={{marginBottom: '4px'}}>Buy a subscription to add more projects</div>
        
        <br/>  
        <Link onClick={()=>{
        }} to="/p" target="payment" style={{ textDecoration: 'none', cursor: 'pointer'}}><h4 style={{cursor: 'pointer', background: primaryBlueColour, color: 'white', border: '0px'}}>Click here</h4><br/><br/><img src={'https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg'} style={{width: '70px'}} />
        </Link>
        </div>);
        
    } else {
        toast[level == 0 ? 'info' : level == -1 ? 'error' : 'success'](message);
    }
    return <div></div>;
}

export default toaster;