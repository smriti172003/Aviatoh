const FirebaseApp = require('firebase/app');
const FirebaseFirestore = require('firebase/firestore');
require('dotenv').config();


const { initializeApp } = FirebaseApp;
const { doc, getFirestore, setDoc, getDoc, collection, getDocs, query } = FirebaseFirestore;




export const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };
   
const fbApp = initializeApp(firebaseConfig);

const db = getFirestore(fbApp);

// used with Promise.resolve()
const getAllDocuments = async (collec) => {
    return await getDocs(query(collection(db, collec)));
}

const getDocument = (collec, documentId) => {
    const docRef = doc(db, collec, documentId);
    return getDoc(docRef);
}

const updateOrCreateDocument = async (collec, documentId, newDataObjectToBeMerged) => {
    const docRef = doc(db, collec, documentId);
    return setDoc(docRef, { ...newDataObjectToBeMerged}, { merge: true });
}

 const PremiumAccountsCollection = 'PremiumAccounts';

 module.exports = {
    PremiumAccountsCollection,
    updateOrCreateDocument
 }