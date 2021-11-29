import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/functions";
import "firebase/compat/analytics";

export class Firebase {
  getSettings() {
    return {
      apiKey: "AIzaSyAeuEJ6aYJRE1JHzRJgabAAF95MzAGmPic",
      authDomain: "clic-compostnew.firebaseapp.com",
      projectId: "clic-compostnew",
      storageBucket: "clic-compostnew.appspot.com",
      messagingSenderId: "553724034700",
      appId: "1:553724034700:web:0a0b6f732410eb6f6945a9",
      measurementId: "G-BR78123BPV",
    };
  }
  constructor() {
    firebase.initializeApp(this.getSettings());
  }

  Init() {
    return firebase.initializeApp(this.getSettings());
  }
  getUser() {
    return firebase.auth().currentUser;
  }
  getStorage() {
    return firebase.storage();
  }
  getFireStore() {
    return firebase.firestore();
  }
  getAuth() {
    return firebase.auth();
  }
  getMessaging() {
    return firebase.messaging();
  }
  getFirebase() {
    return firebase;
  }
  getAnalytics() {
    return firebase.analytics();
  }
  getFunctions() {
    return firebase.functions();
  }
  getCollection(collection: string) {
    return firebase.firestore().collection(collection);
  }
  async signIn(email, password) {
    const auth = this.getAuth();
    return await auth.signInWithEmailAndPassword(email, password);
  }
  async signUp(email, password) {
    const auth = this.getAuth();
    await auth.createUserWithEmailAndPassword(email, password);
  }
  async resetPassword(email) {
    const auth = this.getAuth();
    await auth.sendPasswordResetEmail(email);
  }
  async signWithGoogle() {
    const auth = this.getAuth();
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  }
}
