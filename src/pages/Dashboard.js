import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import {
  primaryBlueColour,
  primarySilverColour,
  showPage,
} from "../App";
import { SearchLoader } from "../components/Loaders";
import {
  getDocument,
  kanbanBoardsCollection,
  projectsCollection,
  updateOrCreateDocument,
  usersCollection,
} from "../db";
import { templatePaths } from "../projectTemplates";
import { IconAviatoh, Loader, Logo, LogoInside } from "../assets";
import toaster from "../components/toaster";
import BlogCard from "../components/BlogCard";
import { signOut } from "firebase/auth";
import { browserStorage, userInfoKey } from "../BrowserStorage";
import Dashboardp from "./Dashboardp";
import AviatohAnalytics from "../components/Training";
import Training from "../components/Training";

function Dashboard(props) {
  const { email, auth } = props;
  const [user, setUser] = useState(null);
  const [projectToAdd, setprojectToAdd] = useState({
    title: "",
    description: "",
    kanbanBoardId: ""
  });


  const [ template, setTemplate ] = useState('Project');

  const [updateUserFlag, setUpdateUserFlag] = useState(false);

  const [addNewProject, setAddNewProject] = useState(false);


  const [ isPremium, setIsPremium ] = useState(false);

  useEffect(() => {
    getDocument('Checks', 'check').then((res)=>{
      setIsPremium(true);
    })

    window.name = 'dashboard';

    showPage();
    console.log(email);
    if (email) {
    //   document.getElementById("booktitle").focus();
      getDocument(usersCollection, email).then((res) => {
        console.log(res.data());
        if (!res.data().paths || !res.data().projects) {
          let usr = res.data();
          if (!res.data().paths) {
            usr.paths = [];
          }
          if (!res.data().projects) {
            usr.projects = [];
          }

          setUser(usr);
        } else {
          setUser(res.data());
        }
      });
    }
  }, [email, updateUserFlag]);

  const projectArchiveStringSeparator = "%arch%archived" + new Date().toDateString();

  const deleteProject= (project) => {
    const confirmation = window.prompt('Are you sure? This action will archive the project, if you are sure, please type in the title of the project you are trying to delete.');
    // toaster(0, confirmation);
    if(confirmation.toUpperCase() == project.toUpperCase()){
    // we delete the project from 'user.projects' array along with all the related paths(documentation-scopes)
    let tempProjects = user?.projects;
    const index = tempProjects?.map(x=>x.title.toLowerCase()).indexOf(project.toLowerCase());

    let tempPaths = user.paths?.filter(x => x.project.toLowerCase().trim() !== project.toLowerCase().trim())
    if(index != -1) {
      tempProjects = tempProjects.filter(x=>x.title.toLowerCase()!==project.toLowerCase());
    }

    // delete related kanban board
    // maybe do not delete, just update the title to /title+archived/
    updateOrCreateDocument(kanbanBoardsCollection, email+project, {
      data: []
    }).then(()=>{
        updateOrCreateDocument(usersCollection, email, {
        //   activities: [...user.activities, 'Project deleted - ' + project],
          projects: tempProjects,
          paths: tempPaths
        }).then(res => {
          setUpdateUserFlag(!updateUserFlag);
          updateOrCreateDocument(projectsCollection, email+'emailproject'+project, {
            deleted: true
           }).then((res)=>{

           }).catch((err)=>{
               console.log(err);
               toaster(0, err.message);
           });
        }).catch(err=>{
          toaster(0, err.message);
        })
    }).catch(err=>{
      console.log(err.message);
      toaster(-1, err.message);
    })
    }
  }

  const [currentTab, setCurrentTab] = useState('home');


    return (
        <div style={{display: 'flex', width: '100vw', marginLeft: '-8px', overflowX: 'hidden'}}>
            <div style={{width: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: '6px', zIndex: '0'}}></div>
            <div style={{width: '10%',background: 'linear-gradient(rgb(239,239,239), rgb(239,239,239))', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: '6px', minHeight:'100vh', position: 'fixed'}}>

               <div
               onClick={()=>{
                setCurrentTab('home');
               }}
               style={{width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'white', cursor: 'pointer',margin: '15px', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
               <i className='fas fa-home' style={{fontSize: '19px', color: currentTab == 'home' ? primaryBlueColour : 'silver', cursor: 'pointer'}}></i>
                </div>

                {/* <div
                  onClick={()=>{
                    setCurrentTab('training');
                  }}
                  style={{width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'white', margin: '15px', cursor: 'pointer', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <i className='fas fa-chalkboard-teacher' style={{fontSize: '19px', color: currentTab == 'training' ? primaryBlueColour : 'silver', cursor: 'pointer'}}></i>
                </div> */}

                <div
                  onClick={()=>{
                    setCurrentTab('notifications');
                  }}
                  style={{width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'white' , margin: '15px', cursor: 'pointer', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <i className='far fa-bell' style={{fontSize: '19px', color: currentTab == 'notifications' ? primaryBlueColour : 'silver', cursor: 'pointer'}}></i>
                </div>

{/* log out */}
                <div
               onClick={()=>{
                var flag = window.confirm('You will be logged out! Do you wish to continue?');
                  if(flag){
                    signOut(auth).then(() => {
                      // Sign-out successful.
                      browserStorage.removeItem(userInfoKey);
                      window.location.reload();
                    }).catch((error) => {
                      // An error happened.
                    });
                  }
               }}
               style={{
                position: 'fixed', bottom: '10px',
                width: '50px', height: '50px', borderRadius: '50%', backgroundColor: primarySilverColour,margin: '15px', cursor: 'pointer', display:'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto'}}>
               <i className='fas fa-power-off' style={{fontSize: '19px', color: 'red', cursor: 'pointer'}}></i>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>









            <div align="center" style={{width: '90%'}}>
            <div align="center" style={{width: '96%', marginLeft: '30px'}}>
            <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingTop: '28px', paddingLeft: '13px', boxShadow: `${'rgb(200, 200, 200)'} 0px 0px 0px`}}>

<img src={Logo} style={{width: '150px'}}  />
<div style={{display: 'flex', alignItems: 'center'}}> 
&nbsp;&nbsp;
&nbsp;&nbsp; &nbsp;
<span style={{cursor:'pointer', fontSize: '15px'}} onClick={()=>{
toaster(0, <div align="right">Email: <b>contact@aviatoh.com&nbsp;&nbsp;&nbsp;&nbsp;</b><br/>
Whatsapp: <b>+91 8126153920&nbsp;&nbsp;&nbsp;&nbsp;</b>
</div>);
}}> Help! </span>
&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;
 
</div>
</div>
                    </div>
             
                {/* <div align="left" style={{width: '100%', padding: '15px', backgroundColor: primaryBlueColour}}>
                            <span style={{marginLeft: '0px'}}>Recommended Feed</span>
                            <span style={{marginLeft: '0px'}}>Filters</span>
                        </div>
                        <br/> */}
                <div align="center" style={{}}>
                <div align="center" style={{width: '94%', marginLeft: '30px'}}>
                   {/* <hr style={{width: '100vw'}}/> */}
                   <br/>
                   <br/>
                   <br/> 
                    { currentTab == 'home' && <Dashboardp email={email}/>}
                    { currentTab == 'training' && <Training email={email}/>}
                    { currentTab == 'notifications' && <div align="left"> 
                      {/* <h2 style={{padding: '0px', margin: '0px'}}>Notifications center</h2> */}
                      <div align="center">
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <h1 style={{color: 'silver'}}>No announcements &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1> 
        </div>
                      </div>}
                    </div>

                </div>

            </div>
            
      {/* add project modal */}

      <div
        style={{
         display: addNewProject? "flex" : "none",
           right: true ? "0px" : "-101vw",
          transition: 'right 0.7s',
          justifyContent: 'center',
          backgroundColor: "white",
          position: "fixed",
          bottom: "0px",
          width: "100vw",
          height: '100vh',
          marginLeft: '-8px',
          zIndex: "99999",
          alignItems: 'center',
          flexDirection: 'column'
        }}
        align="center"
      >


      <div style={{backgroundColor: 'white', width: '50%', borderRadius: '0px', padding: '40px 0px', position: 'relative', height: ''}}>
      <i
          onClick={() => {
            setAddNewProject(false);
          }}
          style={{
            position: "absolute",
            right: "15px",
            cursor: "pointer",
            top: "15px",
            fontSize: "18px",
          }}
          className="fas fa-times-circle"
        ></i>

<div style={{position: 'absolute', width: '15%', height: '100%', top: '0px', backgroundColor: primaryBlueColour}}></div>



 <div style={{display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'flex-start'}}>

          <div style={{width: '100%', color: 'grey'}} align="left">
 <span style={{color: 'grey'}}>1. Project Title</span> <br/>

          <input
          id="booktitle"
          style={{
            border: "0px",
            marginTop: '7px',
            fontSize: "17px",
            borderBottom: '1px solid silver',
            cursor: 'text'
          }}
          onChange={(e) => {
            console.log(user.paths, email);
            setprojectToAdd({ ...projectToAdd, title: e.target.value.trim() });
          }}
          placeholder="Type here ..."
        />
          </div>


        <br/>
        <br/>
          <div style={{width: '100%', color: 'grey'}} align="left">
           2. Choose a template
          <br/>


  <p>
    <input type="radio"
    value='Project'
    checked={template === 'Project'}
    onChange={(e)=>{
      if(e.target.checked){
        setTemplate(e.target.value);
      }
    }}
    id="test1" name="template"/>
    <label for="test1">Default (Customizable Docs)</label>
  </p>

  <p>
    <input type="radio"
    value='Startup/Business'
    onChange={(e)=>{
      if(e.target.checked){
        setTemplate(e.target.value);
      }
    }}
    id="test2" name="template" />
    <label for="test2">Startup/Business Idea</label>
  </p>
  <p>
    <input type="radio"
    value='Book'
    onChange={(e)=>{
      if(e.target.checked){
        setTemplate(e.target.value);
      }
    }}
    id="test3" name="template" />
    <label for="test3">Write a Book </label>
  </p>
        <br/>
        </div>


        <br/>
        <br/>

        <button
          style={{
            backgroundColor: primaryBlueColour,
            color: "white",
            fontSize: "13px",
            margin: '0px'
          }}
          onClick={() => {
            if(user?.projects?.find(x => x.title.toLowerCase() === projectToAdd.title.toLowerCase()+projectArchiveStringSeparator ||  x.title.toLowerCase() === projectToAdd.title.toLowerCase())){
                toaster(-1, "Project with this title already exists");
            } else {
                if (projectToAdd.title && projectToAdd.title !== "") {
                    // var key = email + new Date().toString().replaceAll(" ", "");
                    let templatePathsArray = [...templatePaths(email, template, projectToAdd.title)];
                    updateOrCreateDocument(usersCollection, email, {
                      activities: [...user.activities, 'Project added - ' + projectToAdd.title],
                      projects: [
                        ...user.projects,
                        {
                          ...projectToAdd,
                          type: template,
                          kanbanBoardId: email + new Date().toString().replaceAll(" ", "")
                        },
                      ],
                      paths: [
                        ...user.paths,
                        ...templatePathsArray
                      ]
                    })
                      .then((res) => {
                        setUpdateUserFlag(!updateUserFlag);
                        setAddNewProject(false);
                        document.getElementById("booktitle").value = "";
                        updateOrCreateDocument(projectsCollection, email+'emailproject'+projectToAdd.title, {
                         preview: templatePathsArray.find(x=>x.title === 'Introduction').topics[0].id,
                         type: template,
                         deleted: false
                        }).then((res)=>{

                        }).catch((err)=>{
                            console.log(err);
                            toaster(0, err.message);
                        });
                      })
                      .catch((err) => {
                        toaster(0, err.message);
                      });
                  } else {
                    toaster(-1, "Title can not be empty");
                  }
            }
          }}
        >
          Add Project
        </button>
        </div>
      </div>
      <br/><br/>
      <br/><br/>
      </div>
        </div>
    );
}

export default Dashboard;