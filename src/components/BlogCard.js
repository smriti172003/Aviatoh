import React, { useEffect, useState } from 'react';
import { primarySilverColour } from '../App';
import PaymentsPopUp from '../pages/payments';
import { Openailogo } from '../assets';
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function BlogCard(props) {
    useEffect(()=>{
        document.getElementById('textareaRefine').focus();
    }, []);

    const [ aiRes, setAiRes ] = useState(null);

    const [ loadingAiRes, setLoadingAiRes ] = useState(null);

    const askAi = async () => {
        if(document.getElementById('textareaRefine').value.length < 5) {
            setAiRes('⚠️ Your input is too short, please elaborate more');
        } else{
            setLoadingAiRes(true);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: document.getElementById('textareaRefine').value + 'give html format with paragraphs',
            temperature: 0.2,
            max_tokens: 2000,
          });
        setLoadingAiRes(false);

        document.getElementById('aiRes').innerHTML = response?.data?.choices[0]?.text + '<div style="height: 50vh;"></div>';
        setAiRes(response?.data?.choices[0]?.text);
        }
    }

    return (
        <div align="left" style={{width: '93%', borderRadius:'4px'}}>
            <div style={{display: 'flex', justifyContent:'space-between', alignItems: 'flex-end'}}>
                <div>
                    <h1 style={{padding: '0px'}}>Ideation Assistant!</h1>
                    <br/>
                    <img src={Openailogo} style={{width: '70px'}} />
                </div>
                <div style={{display: 'flex'}}>
                     <button 
                     onClick={()=>{
                        document.getElementById('aiRes').innerHTML = '';
                        askAi();
                     }}
                     style={{
                        display: 'inline',
                        borderRadius: '999px', border: '0px solid silver', padding: '8px 15px'}}>
                        Submit
                        &nbsp;
                        <i style={{color: 'grey', cursor: 'pointer'}} className='fas fa-paper-plane'></i>
                        </button> 
                       &nbsp; 
                     <button
                    onClick={()=>{
                        document.getElementById('textareaRefine').value = '';
                        document.getElementById('aiRes').innerHTML = '';
                        // window.location.reload();
                    }}
                     style={{ 
                        display: 'inline',  border: '0px solid silver', borderRadius: '999px', display: 'flex', alignItems: 'center'}}>
                        Clear &nbsp;
                     <i style={{color: 'grey', cursor: 'pointer'}} className='fas fa-backspace'></i>
                     </button>
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <grammarly-editor-plugin
            style={{  
                cursor: 'text',
                width:'100%', 
                marginRight: '15px'

            }}>
                <textarea
                style={{
                border: '1px solid rgb(200, 200, 200)',
                cursor: 'text',
                width: '98%',
                padding: '15px',
                fontFamily: 'Poppins',
                borderRadius: '5px',
                marginTop: '5px'

                }}
                id="textareaRefine"
                rows={3}
                placeholder='Ask anything... (Explain ideas/queries in detail to get better response)'></textarea> 
              </grammarly-editor-plugin>
              
                


            </div>
            { loadingAiRes ? <div style={{width: '100%'}} align="center"><br/><br/><br/><br/><br/><br/><img src={'https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp?cid=ecf05e47z2lqm258ulq3m20n4s88amagzu50ruq7r4e8lc5v&rid=giphy.webp&ct=g'} style={{width: '150px'}}/></div>: null }
            <br/>
            <br/>
            <div style={{height: '100vh', overflowY: 'scroll', paddingBottom: '50vh', all: 'none'}} id="aiRes">
          
                
      
            </div>
          
        </div>
    );
}
export default BlogCard;