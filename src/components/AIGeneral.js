import React, { useEffect, useState } from 'react';
import { primaryBlueColour, primaryGreenColour, primarySilverColour } from '../App';
import { Openailogo,  } from '../assets';

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


function AIGeneral(props) {
    useEffect( ()=>{
        document.getElementById('askanything').focus();
    }, []);

    const [ aiRes, setAiRes ] = useState(null);

    const [ loadingAiRes, setLoadingAiRes ] = useState(null);

    const askAi = async () => {
        if(document.getElementById('askanything').value.length < 5) {
            setAiRes('⚠️ Your input is too short, please elaborate more');
        } else{
            setLoadingAiRes(true);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: document.getElementById('askanything').value + 'give html format with paragraphs',
            temperature: 0.2,
            max_tokens: 2000,
          });
        setLoadingAiRes(false);

        setAiRes(response?.data?.choices[0]?.text);
        }
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '30px',
            paddingBottom: '10px', 
        }}>
            <div style={{
                width: '30vw'
            }} 
            align="left"
            >
                   <span style={{fontSize: '30px', color: 'silver'}}>Ideation Assistant</span>
                   <br/>
                   <span style={{color: 'grey'}}>
              Powered By  &nbsp;
                <img src={Openailogo} width="80" style={{
                    marginBottom: '-5px'
                }} /> 

                </span>
                <br/>
                <br/>
                <br/>
                <br/>
             
               <input
               id="askanything"
               style={{
                cursor: 'text',
                border: '0px',
                paddingLeft: '10px',
                paddingRight: '10px',
                paddingTop: '10px',
                paddingBottom: '8px',
                width: '80%',
                overflow: 'visible',
               }}
               rows={1}
               placeholder="What's on your mind?" /> 
               <br/>
               <br/>
               <button 
               onClick={()=>{
                askAi();
               }}
               style={{
                borderRadius: '999px',
                margin: '0px 0px', fontSize: '15px', border: '1px solid silver'}}>
                    Submit
                </button>
                &nbsp; 
                <button 
               onClick={()=>{
                setAiRes(null);
                document.getElementById('askanything').value = '';
                setLoadingAiRes(null);
               }}
               style={{
                borderRadius: '999px',
                margin: '0px 0px', fontSize: '15px', backgroundColor: 'transparent'}}>
                    Clear
                </button>
                <br/>
                <br/> 
            
                
            </div>

            <div style={{
                width: '60vw',
                height: '200px',
                overflow: 'scroll',
                background: 'linear-gradient(white,'+ primarySilverColour+')'
            }}
            align="left"
            >  
            <div 
            style={{  padding: '15px'}}
            dangerouslySetInnerHTML={{__html: loadingAiRes === null ? '<span style="color: grey;">AI output will be shown here :<br/><br/></span>' : loadingAiRes === true ? '<span>Loading... please be patient!</span>' : aiRes}}
            > 
            </div> 

            </div>
        </div>
    );
}

export default AIGeneral;