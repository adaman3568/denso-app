import * as firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
};
const projectId : string | undefined = process.env.REACT_APP_FIREBASE_PROJECT_ID;
console.log(projectId);
export const firebaseAuthPath = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${projectId}`;
export const firebaseRefreshAuthPath = `https://securetoken.googleapis.com/v1/token?key=${projectId}`;
export const apiEndPointBase = "https://localhost:44394/api/"

firebase.initializeApp(firebaseConfig);
export default firebase;

export const DocumentList = {
    Customers : 'Customers',
    Cars : 'Cars',
    Employees : 'Employees',
    Comments : 'Comments'
}