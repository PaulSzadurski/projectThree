import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDWzAu9T_FzPWuCAU1EYBFJqtV3ORNM_hw",
  authDomain: "movie-review-board.firebaseapp.com",
  projectId: "movie-review-board",
  storageBucket: "movie-review-board.appspot.com",
  messagingSenderId: "751154567730",
  appId: "1:751154567730:web:7e105b1571480f0cd3ba2b"
};
firebase.initializeApp(firebaseConfig);

export default firebase;