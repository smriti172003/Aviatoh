import React, { useEffect, useState } from 'react';
import { primaryGreenColour, primaryBlueColour as dblue, primarySilverColour } from '../../App';
import { Logo } from '../../assets';
import { SearchLoader } from '../../components/Loaders';
import Footer from '../../components/Footer';

const primaryBlueColour = 'rgb(35,113,236)'

function PaymentsPopUp(props) {
 

    const [hideLoader, setHideLoader] = useState(false);

    useEffect(()=>{ 
            const ele = document.getElementById('razorpaybtn');
            ele.style.display = 'inline';
            ele.style.marginRight = '30px';
            document.getElementById('oplopl').prepend(ele);
              
    }, [])

    const planCSS = {    borderRadius: '4px',
        boxShadow: '0 4px 10px rgba(0,0,0,.15)', position: 'relative', zIndex: '99999', padding: '30px', width: '45vw', backgroundColor: 'white'};

    return (<div style={{
        overflow: 'hidden'

    }}>
    {/* {!hideLoader ? <SearchLoader /> : null} */}
   { !props.inline && <div align="left" style={{width: '100vw', padding: '15px', marginLeft: '-8px', backgroundColor: props.inline ? 'transparent' : '', color: dblue, position: 'relative'}}>
       <a href="https://aviatoh.com" style={{textDecoration: 'none', cursor: 'pointer', color: dblue}}>Back to Dashboard</a>
    </div>}
   <br/>
   <br/> 
   {/*} <div style={{width: '6vw', height: '100vh', marginLeft: '-8px', right: '0px', backgroundColor: props.inline ? 'transparent' : 'rgb(230, 230, 230)', position: 'absolute'}}></div>
              <br/> */} 
        <div style={{ 
            top: '0px',
            left: '0px',
            marginLeft: '-8px',
            width: '100vw',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            // border: '30px solid silver'
        }}>
            {/* Free Plan, Basic Plan, Premium Plan,  */}
           
           
            <div id="oplopl" style={{
                display: 'flex',
                alignItems: 'flex-start'
            }}>
               



                <div style={{...planCSS,  marginTop: '7px',     border: '1px solid #e3e9eb'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: primaryBlueColour,
                        width: '100%',
                        borderRadius: '3px'

                    }} align="left">
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            }}>
                            <span style={{fontSize: '28px', marginLeft: '20px'}}> PREMIUM Subscription </span> 
                             
                        </div>
                       
                    </div>
                    {/* <hr style={{marginLeft: '20px'}} /> */}
                    <br/>
                    <div style={{padding: '0px 0px'}}>                    
                        {/* <div align="left">Features</div> */}
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            <div>
                                <ul align="left">
                                    <li><span style={{color: '#4BB543 '}}>&#10004;</span> &nbsp; Create Multiple Projects &nbsp; </li>
                                    <li><span style={{color: '#4BB543 '}}>&#10004;</span> &nbsp; Documentation Editor&nbsp; </li>
                                    <li><span style={{color: '#4BB543 '}}>&#10004;</span> &nbsp; Project Management Tools &nbsp; </li>
                                    <li><span style={{color: '#4BB543 '}}>&#10004;</span> &nbsp; AI Ideation Assistant &nbsp; </li>
                                    <li><span style={{color: '#4BB543 '}}>&#10004;</span> &nbsp; Progress Tracking &nbsp; </li>
                                    <li><span style={{color: '#4BB543 '}}>&#10004;</span> &nbsp; Email Reminders &nbsp; </li>
                                    <li><span style={{color: '#4BB543 '}}>&#10004;</span> &nbsp; Share Documentats &nbsp; </li>
                                    {/* <li><strike style={{color: 'grey'}}>Marketing Tools</strike></li>
                                    <li><strike style={{color: 'grey'}}>Collaboration Tools</strike></li> */}
                                </ul>
                        </div>
                        <div style={{width: '33%'}}>
                        <img style={{width: '80%'}} src={Logo} /> 
                        <div style={{height: '12px'}}></div>
                        </div>

                        </div>
                         
          
                </div>
                </div>





 
                
            </div>
        </div>  
        <div>
          
        </div>
        </div>
    );
}

export default PaymentsPopUp;