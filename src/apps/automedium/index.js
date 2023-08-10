import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { primaryBlueColour, primaryRedColour, primarySilverColour, showPage } from '../../App';
import Loader from '../../components/Loaders';

const apiBaseUrl = 'http://localhost:9000';

function AutoMedium(props) {
    useEffect(()=>{
        showPage();
    });

    const [ titles, setTitles ] = useState([]);
    const [ loginLink, setLoginLink ] = useState(null);

    const [ loading, setLoading ] = useState(false);

    const [ monitoringData, setMonitoringData ] = useState([]);

    useEffect(()=>{
        if(monitoringData.length > 0){
            const step = monitoringData[monitoringData.length-1];
            const ele = document.createElement('li');
            ele.style.color = step.status == 0 ? 'red' : step.status == 2 ? '#43e723' :  'white'
            ele.innerHTML = step.message;
            ele.style.marginBottom = '10px';
        document.getElementById('terminal').appendChild(ele);
        }
    }, [monitoringData])

    const publish = () => {
        if(titles.length === 0 || loginLink === null){
            toaster(0, "Invalid data");
        } else {
            setLoading(true);
            axios.post(apiBaseUrl+'/settitles', {
                titles: titles
            }).then(res=>{
                setMonitoringData([...monitoringData, {status: 1, message: 'Titles updated'}])
                axios.post(apiBaseUrl+'/setloginlink', {
                    link: loginLink
                }).then(res => {
                setMonitoringData([...monitoringData, {status: 1, message: 'Login link updated'}])
                    axios.get(apiBaseUrl+'/generateblogs').then(res => {
                        setMonitoringData([...monitoringData, {status: 1, message: 'Content generated'}])
                        setTimeout(()=>{
                            setMonitoringData([...monitoringData, {status: 2, message: 'Opening cypress ...'}]) 
                            setLoading(false);
                        }, 1000);
                        axios.get(apiBaseUrl+'/publish').then(res => {
                            setMonitoringData([...monitoringData, {status: 2, message: 'Process finished 🍺'}]) 
                            setLoading(false);
                        }).catch(err => {
                            setMonitoringData([...monitoringData, {status: 0, message: err}])
                            setLoading(false);
                        })
                    }).catch(err => {
                        setMonitoringData([...monitoringData, {status: 0, message: err}])
                        setLoading(false);
                    })
                }).catch(err => {
                    setMonitoringData([...monitoringData, {status: 0, message: err}])
                    setLoading(false);
                })
            }).catch((err)=>{
                setMonitoringData([...monitoringData, {status: 0, message: err}])
                setLoading(false);
            })
        }
    }

    return (
        <div style={{display: 'flex', marginTop: '20px', justifyContent: 'center'}}>
        <div style={{width:'40%'}}> 
            <input
             style={{
                border: '0px',
                borderBottom: '1px solid silver'
            }}
            onChange={(e)=>{
                setTitles(e.target.value.split(','));
            }}
            rows={6} placeholder='comma, separated, list, of, titles'></input>
            <br/>
            <br/>
            <input
            style={{
                border: '0px',
                borderBottom: '1px solid silver'
            }}
            onChange={(e)=>{
                setLoginLink(e.target.value);
            }}
            placeholder='Login link for medium'></input>
            <br/>
            <br/> 
            <button onClick={publish}>Publish</button>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/> 
            <a href="https://medium.com" target="_medium"><button style={{
                color: primarySilverColour,
                backgroundColor: primaryBlueColour
            }}>Medium</button></a> 
            <a href="https://mail.google.com/mail/u/0/#inbox" target="_medium"><button style={{
                color: primarySilverColour,
                backgroundColor: primaryBlueColour
            }}>Gmail</button></a>
             <button style={{
                color: primarySilverColour,
                backgroundColor: primaryRedColour
            }}
            onClick={()=>{
                window.location.reload();
            }}
            >Refresh</button>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
        <div style={{
            width: '40%',
            backgroundColor: 'black',
            height: '80vh',
            borderRadius: '6px',
            color: 'silver'
        }}
        align="left"
        >
            <div style={{backgroundColor: primaryBlueColour, width: '100%', padding: '2px 0px'}}>
                <span style={{color: 'white'}}>&nbsp;Monitoring</span> &nbsp;{apiBaseUrl} for node server (openai and cypress)
            </div>
            <ul id="terminal" style={{display: 'flex', flexDirection: 'column'}}>
            </ul>
            <br/>
            <br/> 
            <div style={{display: 'flex', alignItems: 'center'}} align="center">
                {
                    loading ? 
                    <>
                      &nbsp; Loading... &nbsp; <img width="20" src="https://media2.giphy.com/media/3o7bu3XilJ5BOiSGic/200w.webp?cid=ecf05e47lb0xmx8o54r6cbaysd7hmtro96p28smpup97tcji&rid=200w.webp&ct=g" /> 
                    </>
                    : 
                    ''
                }
            </div>

        </div>
        </div>
    );
}

export default AutoMedium;