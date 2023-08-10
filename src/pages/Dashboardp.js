import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import {
  primaryBlueColour,
  primaryGreenColour,
  primaryRedColour,
  primarySilverColour,
  showPage,
} from "../App";
import { SearchLoader } from "../components/Loaders";
import {
  getDocument,
  kanbanBoardsCollection,
  updateOrCreateDocument,
  usersCollection,
} from "../db";
import { templatePaths } from "../projectTemplates";
import { IconAviatoh } from "../assets";
import toaster from "../components/toaster";

function Dashboardp(props) {
  const { email } = props;
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

  const activeTasks = {};

  const [ activeTasksStore, setActiveTasksStore ] = useState(null);

  const getActiveProjectDots = (n) => {
    let dots = '';
    for(let i=0; i<n; i++){
      if(i >= 5) {
        dots += ''; 
      } else {
        dots += '⚪ ';
      }
      
    }
    return dots;    
  }
  
  useEffect(() => {
    getDocument('Checks', 'check').then((res)=>{
      setIsPremium(true);
    });

    showPage();
    console.log(email);
    if (email) {
      document.getElementById("booktitle").focus();
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
 
    let tempPaths = user.paths.filter(x => x.project.toLowerCase() !== project.toLowerCase())
    if(index != -1) {
      tempProjects = tempProjects.filter(x=>x.title.toLowerCase()!==project.toLowerCase());
    }

    // delete related kanban board
    // maybe do not delete, just update the title to /title+archived/
    updateOrCreateDocument(kanbanBoardsCollection, email+project, {
      data: []
    }).then(()=>{
        updateOrCreateDocument(usersCollection, email, {
          activities: [...user.activities, 'Project deleted - ' + project],
          projects: tempProjects,
          paths: tempPaths
        }).then(res => {
          setUpdateUserFlag(!updateUserFlag);
        }).catch(err=>{
          toaster(0, err.message);
        })
    }).catch(err=>{
      console.log(err.message);
      toaster(-1, err.message);
    })
    }
  }

  return (
    <div style={{ position: "relative", width: '100%', marginLeft: '-8px', 
    justifyContent: 'center',
    background:
            'url("")',
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover',
    alignItems: 'center', backgroundAttachment: 'fixed' }}>
       

      {/* <div style={{
        position: 'absolute',
        zIndex: '-1',
        width: '100vw',
        marginLeft: '-8px',
        backgroundColor: primaryGreenColour(0.4),
        height: '230px'
      }}></div> */}

     {(!user) && 
     <span style={{position: 'fixed', bottom: '18px', right: '27px' }}>
      
      Loading...
      </span> 
     } 
 
      <div  align={'left'} style={{marginBottom: '12px', display:'flex', alignItems: 'center'}} >
        <h2  style={{border: '0px', paddingLeft: '8px', paddingRight: '4px', margin: '0px'}}>
            Your Projects/Ideas 
        </h2>
        <Link
              style={{
                  cursor: 'pointer',
                  padding: '7px 10px',
                  paddingTop: '8px',
                  // boxShadow: `${'silver'} 0px 0px 3px`,
                  backgroundColor: "white", 
                  color: primaryBlueColour,
                  fontSize: '18px',
                  textDecoration: 'none',
                  zIndex: '999',
                  borderRadius: '50%',
              }}
              onClick={() => {
                setAddNewProject(true);
                setTimeout(()=>{
                  document.getElementById('booktitle').focus();
                },300);
              }}
            >  
           <i className='fas fa-plus' style={{cursor: 'pointer'}}></i>

              
            </Link>
      </div>
<br/>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          marginLeft: '-8px',  
          paddingLeft: '13px',
        }}
      >
        { user?.projects?.filter(x=>!x.title.includes('%arch')).reverse().map((project, i) => {
          
          if(!activeTasksStore || Object.keys(activeTasksStore).length != user.projects.length) { getDocument(kanbanBoardsCollection, project.kanbanBoardId).then(res => {
            let activeT = 0;
            res.data().data.map(task => {
              if(task.status == 0){
                activeT++;
              }
            });

            activeTasks[project.title] = activeT;
            if(Object.keys(activeTasks).length == user.projects.length){
              setActiveTasksStore(activeTasks);
            }
          }).catch(()=>{ 
            activeTasks[project.title] = 0;
            if(Object.keys(activeTasks).length == user.projects.length){
              setActiveTasksStore(activeTasks);
            }
          });
          
        }
          return (
            <Link to={"/project" + "/" + project.title} style={{
                
                textDecoration: 'none',
                minWidth: '23%',
                
            }}> 
                <div
                className="projecttile"
                  align="left"
                  style={{
                    cursor: 'pointer',
                    paddingBottom: "23px",
                    paddingTop: "17px",
                    paddingLeft: "25px",
                    paddingRight: "25px",
                    //boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
                     border: '1px solid rgb(225, 225, 225)',
                    // background: 'linear-gradient( 95.2deg, rgba(249, 249, 249) 26.8%, rgba(249, 249, 249) 64% )',
                    marginRight: "18px",
                    marginBottom: "18px",
                    color: "grey",
                  }}
                > 
                  <span style={{ fontSize: "12px", color: "grey", cursor: 'pointer' }}>
                    {project.type}
                  </span>

                  <div align="left" style={{  
                  fontSize: "20px",
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}>
                
                    {project.title.toUpperCase()}
                  </div>  
                  <br/>
                  <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  >

<div style={{cursor: 'pointer'}}>
                  {/* <Link
                to={"/project" + "/view/" + email + "/" + project.title}
                style={{
                  textDecoration: "none",
                  color: "gray",
                }}
              >
                  <h4 className="hbtn" style={{ fontSize: "12px", border: '1px solid #bbbbbb', padding: '5px 10px'}}>
                  Share 
                </h4>  
                </Link>
                &nbsp;
                &nbsp;  */}
                <Link
                to={"/project" + "/" + project.title}
                style={{
                  textDecoration: "none",
                  color: "gray",
                }}
              >
                <h4 style={{ fontSize: "8px", border: '0px solid #bbbbbb', padding: '0px', cursor:'pointer'}}>
                 {activeTasksStore!=null && activeTasksStore[project.title]!=null && activeTasksStore[project.title] != 0 ?  <h3 style={{color: 'orange', fontWeight: '700', display: 'inline-block', margin: '0px', padding: '0px', color: 'transparent', textShadow: '0 0 0 ' + primaryGreenColour(0.6)}} title="Active Tasks"> {getActiveProjectDots(activeTasksStore[project.title])}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                 :
                 activeTasksStore!=null && activeTasksStore[project.title]!=null && activeTasksStore[project.title] == 0 ? <span style={{display: 'inline-flex', alignItems: 'center', color: 'grey'}}><h3 style={{color: 'orange', fontWeight: '700', display: 'inline-block', margin: '0px', padding: '0px', color: 'transparent', textShadow: '0 0 0 ' + primarySilverColour}} title="Active Tasks"> {getActiveProjectDots(1)}</h3> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                 :
                //  <h4 style={{
                //   width: '125px',
                //   padding: '0px',
                //   background: 'conic-gradient(from 90deg, rgb(248, 248, 248), rgb(240,240,240))',
                //   height: '20px',
                //   display: 'block',
                //   margin: '0px'
                //  }}></h4>
                <span style={{display: 'inline-flex', alignItems: 'center', color: 'grey'}}><h3 style={{color: 'orange', fontWeight: '700', display: 'inline-block', margin: '0px', padding: '0px', color: 'transparent', textShadow: '0 0 0 '+primarySilverColour}} title="Active Tasks"> {getActiveProjectDots(1)}</h3> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  } 
                </h4>  
                </Link>
                </div>
 
 <span>
        <Link to={`/project/view/${email}/${project.title}`} className='fas fa-external-link-alt' style={{color: 'rgb(170,170,170)', fontSize: '14px', textDecoration: 'none',}}></Link>
        &nbsp;&nbsp;&nbsp;
        <i
                    style={{ color: "silver" }}
                    onClick={(e) => { 
                      e.preventDefault();
                        deleteProject(project.title);
                    }}
                    className="fa fa-trash"
                >
                </i>
                </span>
                </div>
                </div>
            </Link>
          );
        })} 
      </div>
      {user?.projects?.length == 0 ? <div>
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
        <h1 style={{color: 'silver'}}>No Projects Found &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1> 
        </div> : ''}
    






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
    <label for="test1">Default</label>
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
                        ...templatePaths(email, template, projectToAdd.title)
                      ]
                    })
                      .then((res) => {
                        setUpdateUserFlag(!updateUserFlag);
                        setAddNewProject(false);
                        document.getElementById("booktitle").value = "";
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




   
      

                {/* SUBSCRIBE BUTTON */}
              {/* {
  !isPremium &&  <Link to="/p" target={'paymentfafa'} style={{textDecoration: 'none', color: 'black', fontSize: '20px', position: 'fixed', bottom: '-25px', cursor: 'pointer', left: '35px'}}>&nbsp;&nbsp;<img src="https://t4.ftcdn.net/jpg/00/21/08/95/240_F_21089512_WOyLlOQG9huHMnsEClGiH8RkKzl3JTcf.jpg" style={{width: '90px', cursor: 'pointer'}} /></Link>
} */}
 
    </div>
  );
}

export default Dashboardp;
