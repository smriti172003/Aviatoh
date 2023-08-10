import React, { useEffect, useState } from 'react';
import { primaryBlueColour, primaryGreenColour, primarySilverColour } from '../App';
import StickyNote from './StickyNote';
import { getDocument, kanbanBoardsCollection, updateOrCreateDocument, usersCollection } from '../db';
import { Link } from 'react-router-dom';
import toaster from './toaster'; 
import { SearchLoader } from './Loaders';

function KanbanBoard(props) {

  

    const headingStype = {border: '0px', marginTop: '6px', display: 'block', border: '0px solid silver', color: 'grey', paddingLeft: '0px', fontSize: '18px'};
    const [ addNewTask, setAddNewTask ] = useState(false);
    const [ updateUserFlag, setUpdateUserFlag ] = useState(false);
    const [ updateTasks, setUpdateTasks ] = useState(false);
    const [ taskBeingDropped, setTitleBeingDropped ] = useState(null);
    const [ tasks, setTasks ] = useState(
        null
    );

    useEffect(()=>{
        if(props.email && props.projecttitle && props.user?.projects?.find(x=>x.title===props.projecttitle)?.kanbanBoardId !== undefined){
            // toaster(0, props.email+props.user?.projects?.find(x=>x.title===props.projecttitle)?.kanbanBoardId);
                getDocument(kanbanBoardsCollection, props.user?.projects?.find(x=>x.title===props.projecttitle)?.kanbanBoardId).then(res => {
                    // console.log(res.data());
                    setTasks(res.data()?.data?.sort((x,y) => y.priority-x.priority));
                    setUpdateTasks(false);
                }).catch(err => {
                    setTasks([]);
                });
        }
    }, [props.email, props.projecttitle, updateUserFlag, props.user]);

      function allowDrop(e) {
            e.preventDefault();
      }

      function drop(e) {
        e.preventDefault();
        setTitleBeingDropped(null);
        setUpdateTasks(true);
        let droppedOn = e.target.querySelector(`span`).innerHTML.replaceAll(' ', '').trim().toLowerCase();
        switch(droppedOn){
            case "todo":
                setTasks(tasks?.map(task => {
                    if(task.title === taskBeingDropped){
                        return {
                            ...task,
                            status: -1
                        }
                    } else {
                        return task
                    }
                }));
                break;
            case 'inprogress':
                setTasks(tasks?.map(task => {
                    if(task.title === taskBeingDropped){
                        return {
                            ...task,
                            status: 0
                        }
                    } else {
                        return task
                    }
                }));
                break;
            case 'completed':
                setTasks(tasks?.map(task => {
                    if(task.title === taskBeingDropped){
                        return {
                            ...task,
                            status: 1
                        }
                    } else {
                        return task
                    }
                }));
                break;
            case '.':
                setTasks(tasks?.filter(task => task.title !== taskBeingDropped));
                break;
            default:
              
                break;
        }
    }
      

    const updateKanbanBoardWithATask = (task)=>{
        if(task.title.trim === ''){
            toaster(0, 'Task title can not be empty');
        } else {
            if(tasks?.map(x=>x.title).find(x=>x==task.title)){
                toaster(0, 'Task with this title already exists');
            } else {
                if(props.email && props.projecttitle && props.user?.projects?.find(x=>x.title===props.projecttitle) !== undefined){
                    if(tasks === null){
                        setTasks([]);
                    }
                    // update of create the kanbanboard in kanbanboards collection
                    updateOrCreateDocument(kanbanBoardsCollection, props.user?.projects?.find(x=>x.title===props.projecttitle)?.kanbanBoardId, {
                        data: [...tasks, task]
                    }).then(res => {
                        setUpdateUserFlag(!updateUserFlag);
                        setAddNewTask(false);
                         document.getElementById('tasktitle').value = '';
                         document.getElementById('prioritylevel').value = '-1';
                         document.getElementById('taskdescription').value = '';
                    }).catch(err => {
                        toaster(-1, err.message);
                    })
                }
            }
        }
    }

    useEffect(()=>{ 
        if(updateTasks && props.user?.projects?.find(x=>x.title===props.projecttitle)?.kanbanBoardId !== undefined){
            updateOrCreateDocument(kanbanBoardsCollection, props.user?.projects?.find(x=>x.title===props.projecttitle)?.kanbanBoardId, {
                data: tasks
            }).then(res => {
                setUpdateUserFlag(!updateUserFlag);
            }).catch(err=>{
                toaster(-1, err);
                window.location.reload();
            })
        }
    }, [tasks, updateTasks]);

    return (
        <div>   
            {(!tasks ) && <SearchLoader /> }
         <div align="left"> 
        {/* <span align="left" style={{ paddingLeft: '20px', display: 'inline-block', width: '70%', border: '0px solid silver', display: 'flex', justifyContent: 'flex-start', position: 'sticky', top: '0px', borderRadius: '0px', marginBottom: '1px', alignItems: 'flex-end'}}>
        <span style={{width: '0%'}}>
            
        </span>
        <span style={{}}>
         
            Kanban Productivity Board 
    &nbsp; 
           </span>

   
            
            </span>  */}
 
 
 </div>     
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            height: '60vh',
            backgroundColor: 'transparent',
        }}>
     {/* <div style={{width: '81vw', marginBottom: '4px'}} align="left">
     <span style={{fontSize: '17px'}}>📎</span> Task Management Board (Kanban)
     </div> */}
            <div style={{width: '100%', display: 'flex', border: '0px solid black', position: 'absolute', bottom: '0px',
            borderTop: '0px solid ' + primarySilverColour, 
            backgroundColor: 'white', 
            // boxShadow: `rgba(0, 0, 0, 0.08) 0px 0px 13px`,


            justifyContent: 'space-between',}}>
            <div style={{
                width: '32%',
                height: '60vh',
                overflowY: 'auto',
                zIndex: taskBeingDropped ? '9999' : '999',
                paddingBottom: '15px', 
                paddingTop: '10px', 
                borderRadius: '0px 0px 0px 0px',
                border: '1px dotted rgb(200, 200, 200)',

                background: `conic-gradient(from 180deg, white, rgb(244,244,244))`,


            }}
            onDrop={drop} onDragOver={allowDrop}
            align="center"
            >   
            <div align="right" style={{width: '85%', marginBottom: '3px'}}>
               <h2 style={{...headingStype, position: 'relative', display: 'inline-block', paddingRight: '13px'}}>
                <span>To Do</span>
                
               </h2>

               <Link
              style={{
                  cursor: 'pointer',
                  padding: '7px 10px',
                  paddingTop: '8px',
                  position: 'absolute',
                  boxShadow: `${'silver'} 0px 0px 3px`,
                  backgroundColor: "white", 
                  color: primaryBlueColour,
                  fontSize: '15px',
                  textDecoration: 'none',
                  zIndex: '999',
                  borderRadius: '50%',
                  left: '34px',
                  top: '19px'
              }}
              onClick={()=>{
                setAddNewTask(true);
                setTimeout(()=>{
                    
                }, 300);
            }}
            >  
           <i className='fas fa-plus' style={{cursor: 'pointer'}}></i>

              
            </Link>
            </div>
            <br/>
 
                {
                    addNewTask ? <div style={{width: '85%', marginBottom: '80px'}}><div style={{
                        // backgroundColor: primarySilverColour, 
                        // boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
                        textAlign: 'left',
                        color: 'grey',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        marginBottom: '22px'
                        // border: '1px solid silver',
                        
                        
                    }}
                    align="center"
                    >
                    
                        {/* <div style={{backgroundColor: 'white', width: '7.07px', height: '7.07px', position: 'absolute', top: '19px', right: '17px', transform: 'rotate(45deg)'}}></div> */}
                        <div style={{width: '100%', padding: '0px'}}>
                            <input id="tasktitle" type='text' style={{cursor: 'text', marginBottom:'10px', width: '95%', border: '1px solid silver', padding: '6px 6px' }} placeholder='Task name' />
                           
                            {<textarea id="taskdescription" style={{ cursor: 'text', marginBottom:'6px', width: '95%', border: '1px solid silver', fontFamily: 'sans-serif' }} placeholder='Short description'></textarea>}
                            <div style={{display: 'flex', justifyContent: 'space-between'}}> 
                            <select id="prioritylevel">
                                <option value="-1">Priority Level</option>
                                <option value="1">High</option>
                                <option value="0">Medium</option>
                                <option value="-1">Low</option>
                            </select>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                            <span
                            onClick={() => {
                                setAddNewTask(false);
                            }}
                            style={{padding: '3px 10px', borderRadius: '999px', textAlign: 'center', cursor: 'pointer', color: primaryBlueColour}}>
                                Cancel</span>


                            <span
                            onClick={() => {
                                var task = {
                                    title: document.getElementById('tasktitle').value,
                                    status: "-1",
                                    priority: document.getElementById('prioritylevel').value,
                                    description: document.getElementById('taskdescription').value
                                } 
                                if(task.title.trim() == '' ){
                                    toaster(0, 'Task title can not be empty');
                                } else {
                                    updateKanbanBoardWithATask(task);
                                }
                            }}
                            style={{padding: '3px 10px', borderRadius: '999px', textAlign: 'center', backgroundColor: primaryBlueColour, color: 'white', cursor: 'pointer'}}>
                                Save</span>
                                </div>
                            </div>
                        </div>
                    </div> 
                    </div> : null
                }
                {
                    !tasks || tasks?.length < 1 ? <div style={{width: '85%', visibility: taskBeingDropped && 'Add a task' !== taskBeingDropped ? 'hidden' : ''}}>
                    <StickyNote setBeingDropped={setTitleBeingDropped} updateTask={updateKanbanBoardWithATask} title={'Add a task'} priorityLevel={'0'} description={"Click on the '+' button"}/>
                </div> : null
                }
                {
                    tasks?.map(task => {
                        if(task.status == '-1'){
                            return <div style={{width: '85%', visibility: taskBeingDropped && task.title !== taskBeingDropped ? 'hidden' : ''}}>
                                    <StickyNote setBeingDropped={setTitleBeingDropped} updateTask={updateKanbanBoardWithATask} title={task.title} priorityLevel={task.priority} description={task.description}/>
                                </div>
                        }
                    })
                }
            </div>

            <div style={{
                width: '32%',
                height: '60vh',
                overflowY: 'auto',
                borderRight: '0px solid ' + primarySilverColour,
                background: `conic-gradient(from 180deg, white, rgb(244,244,244))`,
                border: '1px dotted rgb(200, 200, 200)',

                paddingBottom: '15px', paddingTop: '10px'
              

            }}
            align="center"

            onDrop={drop} onDragOver={allowDrop}
 
            >  
            <div align="center" style={{width: '85%'}}>
               <h2 style={{...headingStype, position: 'relative', display: 'inline-block', paddingRight: '13px'}}> <span>In Progress</span> (active)</h2>
                </div>
                <br/>  
                {
                    tasks?.map(task => {
                        if(task.status == '0'){
                            return <div style={{width: '85%', visibility: taskBeingDropped && task.title !== taskBeingDropped ? 'hidden' : ''}}>
                            <StickyNote setBeingDropped={setTitleBeingDropped} updateTask={updateKanbanBoardWithATask} title={task.title} priorityLevel={task.priority} description={task.description}/>
                        </div>
                        }
                    })
                }
            </div>

            <div style={{
                width: '32%',
                height: '60vh',
                overflowY: 'auto',
                borderRadius: '0px 0px 0px 0px',
                border: '1px dotted rgb(200, 200, 200)',

                paddingBottom: '15px', paddingTop: '10px', 
                background: `conic-gradient(from 180deg, white, rgb(244,244,244))`,


            }}
            onDrop={drop} onDragOver={allowDrop}
            align="center"
            >  
                <div style={{width: '85%'}}>
               <h2 style={{...headingStype, position: 'relative', display: 'inline-block', paddingRight: '13px'}}> <span>Completed</span></h2>
                </div>
                 <br/> 
                {
                    tasks?.map(task => {
                        if(task.status == '1'){
                            return <div style={{width: '85%', visibility: taskBeingDropped && task.title !== taskBeingDropped ? 'hidden' : ''}}>
                            <StickyNote setBeingDropped={setTitleBeingDropped} updateTask={updateKanbanBoardWithATask} title={task.title} priorityLevel={task.priority} description={task.description}/>
                        </div>
                        }
                    })
                }
            </div>





            {/* add task modal */} 
            <div
                    style={{
                    display: false ? "flex" : "none",
                    right: true ? "0px" : "-101vw",
                    transition: 'right 0.7s',
                    justifyContent: 'center',
                    backgroundColor: "rgb(240, 240, 240, 0.7)",
                    position: "fixed",
                    bottom: "0px",
                    width: "100vw",
                    height: '100vh',
                    marginLeft: '-8px',
                    zIndex: "9999",
                    alignItems: 'center',
                    flexDirection: 'column'
                    }}
                    align="center"
                >
                
                
                <div style={{backgroundColor: 'white', width: '50%', borderRadius: '0px', boxShadow: "rgba(0, 0, 0, 0.1) 10px 10px 10px", padding: '40px 0px', position: 'relative', height: ''}}>
                <i
                    onClick={() => {
                        setAddNewTask(false);
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

                <div style={{position: 'absolute', width: '15%', height: '100%', top: '0px', backgroundColor: primaryBlueColour}}>

                    {/*  */}
                </div>


                
                <div style={{display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'flex-start'}}>
                    
            
                    <div style={{width: '100%', fontSize: '17px', color: 'grey'}} align="left">
                  
                    </div>
                    <input
                    style={{
                        border: "0px",
                        marginTop: '18px',
                        fontSize: "16px",
                        borderBottom: '1px solid silver',
                        cursor: 'text'
                    }}
                    onChange={(e) => {
                    }}
                    placeholder="Task title"
                    />
                    
                    <br/> 
                    <br/>  
                    <div style={{width: '100%', fontSize: '17px', color: 'grey'}} align="left">
                    
                    <select id="prioritylevel">
                        <option value="-1">Priority Level</option>
                        <option value="1">High</option>
                        <option value="0">Medium</option>
                        <option value="-1">Low</option>
                    </select>
                    </div>
                    <br/>  
                    <br/>  
                    <br/>  
                    
                  <textarea
                  id="taskdescription"
                  style={{
                    cursor: 'text'
                  }}
                  rows={4}
                  onChange={(e) => {
                  }}
                  placeholder="Task description"
                  />

                  <br/>
                  <br/>
                  <br/>

                    <button
                    style={{
                        backgroundColor: primaryBlueColour,
                        color: "white",
                        fontSize: "15px",
                        margin: '0px'
                    }}
                    onClick={() => {
                        var task = {
                            title: document.getElementById('tasktitle').value,
                            status: "-1",
                            priority: document.getElementById('prioritylevel').value,
                            description: document.getElementById('taskdescription').value
                        } 
                        updateKanbanBoardWithATask(task);
                    }}
                    >
                    Add Task
                    </button>
                    </div>
                </div>
                <br/><br/>
                <br/><br/>
                </div>
                </div>

          
  {/* UNCOMMENT IF DELETE-A-TASK IS REQUIRED */}
   <div title="Drop a card here to delete" style={{ position: 'fixed', bottom: '6px', zIndex: '999',  padding: '0px 0px', backgroundColor: '', right: '0px'}} align="left">
                  <i
                  onClick={(e)=>{
                    e.preventDefault();
                    //deleteDocumentationBlock(path.title);
                  }}
                  onDragOver={(e)=>{
                    allowDrop(e);
                    // e.target.style.fontSize = '105px';
                  }}
                  onDragLeave={(e)=>{
                    // e.target.style.fontSize = '35px';
                  }}
                  onDrop={drop}
                      style={{ color: "silver", fontSize: '35px', transition: 'font-size 1s'}} 
                      className="fa fa-trash j ddtrash"
                      ><span style={{color: 'white'}}>.</span></i> 
              </div>  
              
        </div> 
        </div>

    );
}

export default KanbanBoard;