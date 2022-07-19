import firebase from 'firebase';
// TODO: Replace the following with your app's Firebase project configuration
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyANNcSYyLaMIFqA24s5jlJIYYlg_gm-XdE",
    authDomain: "r-native-commapp.firebaseapp.com",
    projectId: "r-native-commapp",
    storageBucket: "r-native-commapp.appspot.com",
    messagingSenderId: "406193387446",
    appId: "1:406193387446:web:758cb259c96c3cc9b9f317"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export { db };