import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBdlIgvMjpbJluy6z_3FbDq38wPzWM48tM",
  authDomain: "react-quiz-app-a9149.firebaseapp.com",
  databaseURL: "https://react-quiz-app-a9149-default-rtdb.firebaseio.com",
  projectId: "react-quiz-app-a9149",
  storageBucket: "react-quiz-app-a9149.appspot.com",
  messagingSenderId: "176335193502",
  appId: "1:176335193502:web:ce8926714008fa0d4a828f",
};

// firebase.initializeApp(config);
if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase;
