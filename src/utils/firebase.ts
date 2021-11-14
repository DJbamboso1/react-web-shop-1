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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = getStorage();

export { storage, ref, uploadString, uploadBytesResumable, getDownloadURL, firebase as default }

