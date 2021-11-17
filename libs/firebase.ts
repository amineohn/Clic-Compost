import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
export default async function () {
  const firebaseConfig = {
    apiKey: "AIzaSyD_8go5RZ0kTpp19ZUkiVFGeTUC8fvYDWs",
    authDomain: "clickncompost.firebaseapp.com",
    projectId: "clickncompost",
    storageBucket: "clickncompost.appspot.com",
    messagingSenderId: "1020295512270",
    appId: "1:1020295512270:web:707f016bc4c0a310afd09f",
    measurementId: "G-R7P9BDSQJD",
  };

  await initializeApp(firebaseConfig);
  await getAnalytics(initializeApp(firebaseConfig));
  // await firestore();
}
