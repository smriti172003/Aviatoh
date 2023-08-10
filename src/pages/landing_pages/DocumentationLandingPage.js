import React, { useState } from "react";
import {
  Demo1,
  Demo2,
  Demo3,
  IdeationAssistantView,
  Logo,
  OpenaiIcon,
  Openailogo,
  ProjectView,
  Signinwithgoogleicon
} from "../../assets";
import Typewriter from "typewriter-effect";
import Footer from "../../components/Footer";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../db";
import { primaryBlueColour, primaryGreenColour, primarySilverColour } from "../../App";
const provider = new GoogleAuthProvider();

function DocumentationLandingPage(props) {
  const [showKanbanModal, setShowKanbanModal] = useState(false);

  return (
    <div id="documentationLandingPageView" style={{position: 'relative', width: '100vw', marginLeft: '-8px', backgroundColor: ''}}>

{/* signIn */}
      <div style={{position: 'absolute', top: '18px', right: '30px', display: 'flex', alignItems: 'center', cursor: 'pointer', zIndex: '99999'}}
            onClick={() => {
                signInWithPopup(auth, provider);
              }}
            >
            <img src={Signinwithgoogleicon} style={{width: '35px', cursor: 'pointer'}} />
            <span style={{ color: 'grey', fontSize: '16px', cursor: 'pointer'}}>&nbsp;&nbsp;Sign In</span>
      </div>
{/* blogs */}
          

      <div align="left" style={{position: 'absolute', top: '25px', marginLeft: '20px'}}>
      <img
        src={Logo}
        width={190}
        style={{   }}
      /> 

      </div>
      

      <div
      align="left"
        style={{
          height: "100vh",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          paddingLeft: '20px', 
          justifyContent: 'center',
          // backgroundColor: primaryGreenColour(0.5),
          background:
            'url("https://images.pexels.com/photos/5594262/pexels-photo-5594262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover'
        }}
      >
        <span align="left"  style={{fontSize: '38px', width: '50%',color: 'rgb(166, 166, 166)', padding: '10px 0px',fontWeight: '500', backgroundColor: 'rgb(255, 255, 255, 0)'}}>
 
       Embrace Streamlined Management and Documentation of Your Ideas
        {/* Ideas become reality when you <b>Retain</b>, <b>Document</b>, <b>Refine</b> and <b>Scale</b> them */}
        </span>
        <br/>
        <br/>
        <a style={{
          marginLeft: '7px',
          textDecoration: 'none',
          cursor: 'pointer',
        }} target="blogAviatoh" href="https://medium.com/@aviatoh/streamline-management-and-documentation-of-your-ideas-223ee49645fb">
          <h3 style={{ cursor: 'pointer', color: 'white', marginLeft: '-7px', fontWeight: '700', backgroundColor: primaryGreenColour(0.9)}}>
  Know more
                 </h3></a>
 
      </div>
     
      {/* <Footer from={"mobile"} /> */}
    </div>
  );
}

export default DocumentationLandingPage;
