import React from 'react';
import { primarySilverColour } from '../App';

function Aboutus(props) {
    return (<>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: "0px",
          width: "100vw",
          marginLeft: '-8px',
          background: `linear-gradient( to right, ${primarySilverColour}, ${'transparent'},${'transparent'}`,
          padding: "7px 0px",
          fontSize: '14px'
        }}
      >
        <span>
            &nbsp; &nbsp; About us</span>

        <button 
          style={{
            backgroundColor: 'transparent',
            color: "transparent",
            margin: "0px",
            marginRight: "10px",
            fontSize: "13px",
            zIndex: "99999",
            visibility: 'none'
          }}
        >
          + Add Project
        </button>
      </div>
 
        <div style={{padding:'20px 8px', fontSize: '17px', color: 'gray'}} align="left">
            
            <h1 style={{paddingLeft: '0px'}}>Welcome to Aviatoh</h1>
            <br/>
            <br/>
<div>
            An innovative application designed to help users bring their ideas to life. We understand the importance of ideation and how challenging it can be to retain, refine, document, and scale your ideas. Aviatoh was built with a vision to make ideation more accessible, organized, and streamlined. Our integrated AI tools assist users in thinking big and refine their ideas with ease.
            </div>
            <br/> 
            <div style={{display: 'flex'}}>

<div style={{width: '60%'}}>With Aviatoh, you can unleash your creativity without worrying about losing track of your ideas. Whether you have a business idea, a startup plan, or an idea to write a book, Aviatoh is here to help. Our application offers a comprehensive range of tools that make ideation a smooth and hassle-free experience. Our AI assistant can help you refine your ideas by engaging in conversations and clearing doubts, making the process more interactive and efficient.
</div> 



</div>
<br/>

<div>

At Aviatoh, we believe that everyone has the potential to come up with great ideas, and we are dedicated to helping our users reach their full potential. We understand that ideation is just the first step in the process, and that's why our application is designed to help you at every stage of your journey. From documenting your ideas to scaling them up, we have got you covered. Our goal is to empower our users to turn their ideas into reality and make a positive impact on the world. Join Aviatoh today and start your journey of ideation and innovation!
            </div>
        </div>
    </>

    );
}

export default Aboutus;