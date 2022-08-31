import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAX87ahxxpClQuGpcU_e0ssXtPybHfahLU",
    authDomain: "docsh-v-v.firebaseapp.com",
    projectId: "docsh-v-v",
    storageBucket: "docsh-v-v.appspot.com",
    messagingSenderId: "1009940979048",
    appId: "1:1009940979048:web:891254596cc9d114a00add",
};

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();

export { db };
