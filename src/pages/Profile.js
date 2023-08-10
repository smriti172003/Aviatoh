import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDocument, updateOrCreateDocument, usersCollection } from '../db';
import '../App.scss';
import { browserStorage, userInfoKey } from '../BrowserStorage';
import { signOut } from 'firebase/auth';
import { showPage } from '../App';
import { Logo } from '../assets';
import Footer from '../components/Footer';
import toaster from '../components/toaster';

function Profile(props) {

    useEffect(()=>{
        showPage();
    });

    const { email, auth } = props;

    const [ particulars, setParticulars ] = useState(null);
    const [ eduDataArray, setEduDataArray ] = useState(null);
    const [ expDataArray, setExpDataArray ] = useState(null);

    useEffect(() => {
        if(email){
            getDocument(usersCollection, email).then(res => {
                let data = res?.data();
                console.log(data);
                // set particulars
                setParticulars(data.particulars);

                let eduData = [];
                let expData = [];
                Object.keys(data).map( key => {
                    if(data[key].type == 'edu'){
                        eduData.push(data[key]);
                    } else if(data[key].type == 'exp') {
                        expData.push(data[key]);
                    }
                });

                // set eduData
                eduData.sort((a,b) => b.yearOfGraduation - a.yearOfGraduation )
                setEduDataArray(eduData.length == 0 ? null : eduData);

                //set expData
                setExpDataArray(expData.length == 0 ? null : expData);
            })
        }
    }, [email]);

    const nav = useNavigate();

    function SignOutButton(){
        return <>{ browserStorage.getItem(userInfoKey) &&
            <>
            { browserStorage.getItem(userInfoKey) && <>
            <div
            style={{fontSize: '17px', cursor: 'pointer'}}
            onClick={()=>{
              signOut(auth).then(() => {
                // Sign-out successful.
                browserStorage.removeItem(userInfoKey);
                nav('/');
                window.location.reload();
              }).catch((error) => {
                // An error happened.
              });
            }}><i className="fas fa-power-off" style={{fontSize: '17px', color: 'green'}} /> &nbsp; Sign out</div>
             {/* &nbsp;&nbsp;&nbsp;&nbsp;  @{email?.split('@')[0]}  */}
             </>} 
            </>
            
            }
            </>
    }

    return (

        <div align="left">
            <div style={{minHeight: '60vh'}}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
           <div style={{textAlign: 'center', fontSize: '17px', }}>
           

           { !particulars && <><><span></span><span><Link style={{color: 'black', textDecoration: 'none'}} to="/editprofile">+ Add Particulars &nbsp;  <div style={{ display: 'inline-block', transform: 'rotate(90deg)'}}>✏️</div> </Link></span></></> }

           { particulars && <><><span></span><span>{particulars?.fullname.toUpperCase()}, {particulars?.country.toUpperCase()} &nbsp; <Link style={{color: 'black', textDecoration: 'none'}} to="/editprofile"> <div style={{ display: 'inline-block', transform: 'rotate(90deg)', cursor: 'pointer'}}>✏️</div> </Link></span></></> }
</div> 
           <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh'}}>

      {false &&     <div>
 
           Your school/college education
           <hr/>
           <div style={{fontSize: '35px'}}>📚 Education <Link style={{textDecoration: 'none', color: 'white', backgroundColor: 'silver', fontSize: '25px', padding: '0px 7px', borderRadius:' 50%'}} to="/edu"><span style={{ display: 'inline-block', position: 'relative', transform: 'translate(0px, -1.5px)'}}>+</span></Link></div>
                <table>
                    <tbody>
                    {true && <tr> 
                        <th>Level</th>
                        <th>School</th>
                        <th>Year of graduation</th>
                    </tr>}
                    {
                        eduDataArray?.map( (edu, index) => {
                            return <tr> 
                                        <td><select style={{width: '100%'}}>
                                                <option>
                                                   {edu.degree}
                                                </option>
                                            </select></td>
                                        <td>
                                            <select style={{width: '100%'}}>
                                                <option>
                                                   {edu.institution}
                                                </option>
                                            </select></td>
                                        <td>{edu.yearOfGraduation}</td>
                                        <td style={{cursor: 'pointer', color: 'red'}}  onClick={() => {
                                const flag = window.confirm('Delete this record?');
                                if(flag) {
                                updateOrCreateDocument(usersCollection, email, { [edu.degree.replaceAll(' ', '').trim()]: {type: null} })
                                    .then((res) => {
                                        toaster(0, "Successfully deleted");
                                        window.location.reload();
                                    })
                                    .catch(() => {
                                        toaster(0, "Something went wrong");
                                    });
                                }
                                }}><i className='far fa-times-circle' style={{color: 'grey'}}></i></td>
                                    </tr>
                        })
                    }
                    </tbody>
                </table> 
            </div>}

            <SignOutButton />
 
            
            { false && <div>  

           Section for working professionals
           <hr/>
           <div style={{fontSize: '35px', width: '50vw'}}>👔 Experience <Link className='a' style={{textDecoration: 'none', color: 'white', backgroundColor: 'silver', fontSize: '25px', padding: '0px 7px', borderRadius:' 50%'}} to="/exp"><span style={{ display: 'inline-block', position: 'relative', transform: 'translate(0px, -1.5px)'}}>+</span></Link></div>
                <table>
                <tbody>
                   {true && <tr> 
                        <th>Position</th>
                        <th>Company</th>
                        <th>Technology stack</th>
                        <th>Key responsibilities</th>
                    </tr>}
                    {
                        expDataArray?.map( (exp, index) => {
                            return <tr> 
                                        <td>{exp.jobTitle}</td>
                                        <td><select style={{width: '100%'}}>
                                                <option>
                                                   {exp.company}
                                                </option>
                                            </select></td> 
                                        <td>
                                        <select style={{width: '100%'}}>
                                                <option>
                                                   {exp.tech}
                                                </option>
                                            </select>
                                        </td>
                                        <td> 
                                            <select style={{width: '100%'}}>
                                                <option>
                                                   {exp.responsibilities}
                                                </option>
                                            </select>
                                        </td>
                                        <td style={{cursor: 'pointer', color: 'red'}}  onClick={() => {
                                const flag = window.confirm('Delete this record?');
                                if(flag) {
                                    updateOrCreateDocument(usersCollection, email, { [exp.jobTitle.replaceAll(' ', '') + exp.company.replaceAll(' ', '')]: {type: null} })
                                    .then((res) => {
                                        toaster(0, "Successfully deleted");
                                        window.location.reload();
                                    })
                                    .catch(() => {
                                        toaster(0, "Something went wrong");
                                    });}
                                }}><i className='far fa-times-circle' style={{ color:'grey'}}></i></td>
                                    </tr>
                        })
                    }
                    </tbody>
                </table> 
                </div>}
                </div>
            <br/> 
            

           
            {/* <Link to="/"><img src={Logo} style={{ width: '150px', position: 'absolute', top: '50px', left: '50px'}} /> </Link> */}
</div>
          
        </div>
    );
}

export default Profile;