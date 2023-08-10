import React, { useEffect, useState } from 'react';
import { getDocument, kanbanBoardsCollection, usersCollection } from '../db';
import PieChart from './PieChart';

function Training(props) {

    const { email } = props;

    const [ htodo, setHTodo ] = useState(0);
    const [ mtodo, setMTodo ] = useState(0);
    const [ ltodo, setLTodo ] = useState(0);
    const [ inprogress, setInProgress ] = useState(0);
    const [ completd, setCompleted ] = useState(0);

    useEffect(()=>{
        
    }, []);
    
    return (
        <div align="left">
           
        </div>
    );
}

export default Training;