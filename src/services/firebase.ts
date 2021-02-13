// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAkBBlnU_6PJNcfD5yyWiaFAe4v2K02maQ",
  authDomain: "laporcovid19-18773.firebaseapp.com",
  projectId: "laporcovid19-18773",
  storageBucket: "laporcovid19-18773.appspot.com",
  messagingSenderId: "104399510671",
  appId: "1:104399510671:web:c4a07749b21639d4f1a4fa",
  measurementId: "G-VQ5PCLL271"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const firestore = firebaseApp.firestore();
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, firebase, storage, firestore };
export default db;
