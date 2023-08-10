

import React, { useEffect, useState } from 'react';
 
import './App.scss';
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { browserStorage, userInfoKey } from './BrowserStorage';
import { firebaseConfig, getDocument, topicsCollection, updateOrCreateDocument, usersCollection } from './db';
import ParticularsForm from './pages/ParticularsForm';
import Profile from './pages/Profile';

import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

import { toast, ToastContainer } from 'react-toastify';
 


import { HashRouter as BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreatePath from './pages/CreatePath';
import TextEditor from './components/TextEditor';
import Dashboard from './pages/Dashboard';
import DocumentationLandingPage from './pages/landing_pages/DocumentationLandingPage';
import MobileVersion from './pages/landing_pages/MobileVersion';
import Project from './pages/Project';
import ViewDoc from './pages/ViewDoc';
import PaymentsPopUp from './pages/payments';

import 'react-toastify/dist/ReactToastify.css';
import toaster from './components/toaster';
import { IconAviatoh, Logo } from './assets'; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lf7vG0lAAAAAFDEOWnEPxZIsei9RGMo8QBTxxPB'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});
const analytics = getAnalytics(app);
 
const auth = getAuth(app);

export const primaryBlueColour = '#35465d';
export const primaryRedColour = '#a21028';
export const primaryYellowColour = '#ffb43b';

export const primaryGreenColour = (alpha) => {
  return `rgb(61, 153, 112, ${alpha})`
}

export const primarySilverColour = 'rgb(238,238,238)';

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};



export const showPage = () => {
  setTimeout(()=>{
  const elements = document.querySelectorAll('*'); 

  for (let i = 0; i < elements.length; i++) {
    elements[i].style.opacity = '1';
  }
  }, 0)
}

function App() {

  const [ isPremium, setIsPremium ] = useState(false);

  useEffect(() => {
    getDocument('Checks', 'check').then((res)=>{
      setIsPremium(true);
    })
  }, []);

  useEffect(()=>{
    showPage();
  }, []);

  const [ email, setEmail ] = useState(null);
  const [ photoURL, setPhotoURL ] = useState(null);


  useEffect( ()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setEmail(user.email);
        console.log(user.photoURL);
         
        
        if(!browserStorage.getItem(userInfoKey)){
          browserStorage.setItem(userInfoKey, user);
          getDocument(usersCollection, user.email).then(res => {
            if(!res.data()){
              var key = user.email + new Date().toString().replaceAll(" ", "");
              updateOrCreateDocument(topicsCollection, key, {
                data: `<h2 style="text-align: left;"><span style="color: rgb(126, 140, 141);">Sample Document</span></h2> <p><span style="color: rgb(126, 140, 141);">You can delete this text and start writing the documentation...</span> <p>&nbsp;</p> <p>&nbsp;</p>`,
              }).then((res) => {
              });
              updateOrCreateDocument(usersCollection, user.email, {
                email: user.email,
                activities: [],
                projects: []
                // projects: [
                //   {
                //     title: 'Sample Project',
                //     description: '',
                //     type: 'Project',
                //     kanbanBoardId: user.email + new Date().toString().replaceAll(" ", "")
                //   }
                // ],
                // paths: [
                //   {
                //     title: 'Sample Single Doc.',
                //     project: 'Sample Project',
                //     description: '',
                //     topics: [{
                //       id: key,
                //       title: 'Sample Document'
                //     }],  // sending topics array is important for the view
                //     type: 'single'
                //    },
                //   // {
                //   //   title: 'Product Design',
                //   //   project: 'Sample Project',
                //   //   description: '',
                //   //   topics: []
                //   // },
                //    {
                //      title: 'Sample Collection',
                //      project: 'Sample Project',
                //      description: '',
                //      topics: [],
                //     type: 'collection'
                //    },
                //   // {
                //   //   title: 'QA',
                //   //   project: 'Sample Project',
                //   //   description: '',
                //   //   topics: []
                //   // },
                //   // {
                //   //   title: 'FAQs',
                //   //   project: 'Sample Project',
                //   //   description: '',
                //   //   topics: []
                //   // }
                // ]
              })
            .then((res) => { 
              window.location.reload();
            })
            .catch((err) => {
              toaster(-1, err);
            });
            }
          })

         // window.location.reload();
        }
        // ...
      } else {
        console.log('user is logged out');
        // User is signed out
        // ...
      }
    });
  }, [])

  return (
    <div className="App">

      {
        window.mobileCheck() ? 
        
         <MobileVersion />
  :
<div>
    { browserStorage.getItem(userInfoKey) && <BrowserRouter >
      <div style={{position: 'absolute', zIndex: '999999999999'}}><ToastContainer
      position="top-center" />
      </div>
    <div style={{
      minHeight: '100vh'
    }}>
      {/* <NavigationBar /> */}

            <Routes>

              {/* Pages */}
              <Route exact path="/" element={<>
                <Dashboard email={email} auth={auth}/> 
              </>}
              />
              <Route exact path="/p" element={<>
                <PaymentsPopUp email={email} /> 
              </>}
              />
              <Route path="/texteditor" element={<>
                <TextEditor email={email} />
              </>} />
              <Route path="edit/:email/:projecttitle/:pathtitle" element={<>
                <CreatePath email={email} />
              </>} />
              <Route path="/project/:projecttitle" element={<>
                <Project email={email}/>
              </>} />
              <Route path="/project/view/:email/:projecttitle" element={<>
                <ViewDoc />

              </>} />

              {/* generic */}
              <Route path="/profile" element={<>
              <Profile email={email} auth={auth} />
              </>} />
              <Route path="/editprofile" element={<>
                <ParticularsForm email={email} />
              </>} />
              <Route path="/aboutus" element={<>
                {/* <Aboutus /> */}
              </>} />
              
              </Routes>

              {
                <Link
              id="linktoprofile"
              to="/profile" style={{visibility: 'hidden',color: 'grey', backgroundColor: 'white', cursor: 'pointer'}}>
                <i style={{
                position: 'fixed', 
                top: '6px',
                right: '6px',
                cursor: 'pointer',
                // boxShadow: '0px 0px 150px 30px '+ 'grey',
                backgroundColor: 'transparent',
                }} >
                  {/* {isPremium ? <span style={{color: 'black', fontSize: '14px', display: 'inline-block', position: 'absolute', top: '-1px', right: '40px'}}>&nbsp;&nbsp; Premium </span> : 
               null 
                }  */}
              <img className="fa gear" style={{width: '30px', cursor: 'pointer'}} src={IconAviatoh}/>
                 </i>
              </Link>
              }
            </div> 

    </BrowserRouter>}


    { !browserStorage.getItem(userInfoKey) && 
    <>
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<>
        <DocumentationLandingPage />
              </>} />

      <Route path="/aboutus" element={<>
        {/* <Aboutus /> */}
      </>} />
      </Routes>
    </BrowserRouter>
                 </> 
        }



    </div>
      }
    </div>
  );
}

export default App;
