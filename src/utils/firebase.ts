import firebase from 'firebase/compat/app';
import { getStorage, ref, uploadBytesResumable, uploadString, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCIys76-WLW-owpQdiPrWrVVy03na3-_0g",
  authDomain: "gecko-image-b2fc6.firebaseapp.com",
  projectId: "gecko-image-b2fc6",
  storageBucket: "gecko-image-b2fc6.appspot.com",
  messagingSenderId: "219242947497",
  appId: "1:219242947497:web:7d0fa113aa2e3deba19ab8"
};

// const firebaseConfig = { 
//   apiKey : "AIzaSyBSWuGkZ3EaH35BRLkmTvxqA3E9rhTNg3k" , 
//   authDomain : "gecko-b3c27.firebaseapp.com" , 
//   databaseURL : "https://gecko-b3c27-default-rtdb.asia-southeast1.firebasedatabase.app" , 
//   projectId : "gecko-b3c27" , 
//   storageBucket : "gecko-b3c27.appspot.com" , 
//   messagingSenderId : "148697104282" , 
//   appId : "1: 148697104282: web: f8628adecb325582000423" , 
//   measurementId : "G-7X0VYLDMTB" 
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = getStorage();

export { storage, ref, uploadString, uploadBytesResumable, getDownloadURL, firebase as default }

