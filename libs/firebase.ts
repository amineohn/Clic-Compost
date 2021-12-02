import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/functions";
import "firebase/compat/analytics";
import "firebase/compat/performance";
import "firebase/messaging";
import router from "next/router";
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
    console.log(`Initialize Firebase ${firebase.apps.length} app`);
  }

  getUser() {
    return firebase.auth().currentUser;
  }

  getUserName() {
    return this.getUser()?.displayName;
  }
  getPhotoUrl() {
    return this.getUser()?.photoURL;
  }
  getDefaultPhotoUrl() {
    return "/static/images/blank-profile.png";
  }
  getEmail() {
    return this.getUser()?.email;
  }
  getTokenId() {
    return this.getUser()?.getIdToken();
  }
  getUserData() {
    return this.getFireStore().collection("users").doc(this.getUser()?.uid);
  }
  isConnected() {
    return this.getAuth().currentUser !== null;
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
  getDatabase() {
    return firebase.database();
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
  getReference(ref: string, child: string) {
    return this.getDatabase().ref(ref).child(child);
  }

  getDocumentPath(collection: string, documentPath: string) {
    return this.getCollection(collection).doc(documentPath);
  }
  getUserId() {
    return this.getUser()?.uid;
  }
  getPerformance() {
    return firebase.performance();
  }
  onAuthStateChanged(callback: (user: firebase.User | null) => void) {
    const auth = this.getAuth();
    auth.onAuthStateChanged(callback);
  }
  currentPassword(currentPassword) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      this.getEmail() as string,
      currentPassword
    );
    return this.getUser()?.reauthenticateWithCredential(credential);
  }
  updatePassword(currentPassword, newPassword) {
    this.currentPassword(currentPassword)?.then(() => {
      return this.getUser()?.updatePassword(newPassword);
    });
  }
  getData(
    phone: string,
    name: string,
    email: string,
    frequency: string,
    collectTime: string,
    address: string,
    collection: string
  ) {
    return {
      id: this.getCollection(collection).doc().id,
      phone: phone,
      name: name,
      email: email,
      frequency: frequency,
      collectTime: collectTime,
      address: address,
    };
  }
  async signIn(
    email: string,
    password: string,
    collection: string,
    url: string,
    documentPath?: string | undefined
  ) {
    const auth = this.getAuth();
    return await auth
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        await router.push(url);
        await this.getCollection(collection).doc(documentPath).set({
          name: this.getUserName(),
          email: this.getEmail(),
        });
      });
  }
  async sendEmailVerification() {
    const user = this.getUser();
    await user?.sendEmailVerification();
  }
  async sendPasswordResetEmail(email: string) {
    const auth = this.getAuth();
    await auth.sendPasswordResetEmail(email);
  }

  async databaseUpdate(collection: string, documentPath: string, data: any) {
    const collectionRef = this.getCollection(collection);
    const documentRef = collectionRef.doc(documentPath);
    await documentRef.update(data);
  }
  async databaseCreate(collection: string, data: any) {
    const collectionRef = this.getCollection(collection);
    await collectionRef.add(data);
  }
  async databaseDelete(collection: string, documentPath: string) {
    const collectionRef = this.getCollection(collection);

    const documentRef = collectionRef.doc(documentPath);
    await documentRef.delete();
  }
  async databaseGet(collection: string, documentPath: string) {
    const collectionRef = this.getCollection(collection);
    const documentRef = collectionRef.doc(documentPath);
    return await documentRef.get();
  }
  async databaseGetAll(collection: string) {
    const collectionRef = this.getCollection(collection);
    return await collectionRef.get();
  }
  async databaseGetAllByField(collection: string, field: string, value: any) {
    const collectionRef = this.getCollection(collection);
    return await collectionRef.where(field, "==", value).get();
  }

  async updateUser(collection: string, documentPath: string, data: any) {
    const user = this.getUser();
    const userData = this.getUserData();

    if (userData) {
      await this.getCollection(collection).doc(documentPath).update(data);
    } else {
      await this.getCollection(collection).doc(documentPath).set(data);
    }
    if (user) {
      await user.updateProfile({
        displayName: data.name,
        photoURL: data.photoURL,
      });
    }

    return await userData.update(data).then(async () => {
      await this.getCollection(collection).doc(documentPath).set({
        name: this.getUserName(),
        email: this.getEmail(),
      });
    });
  }
  async signUp(email: string, password: string) {
    const auth = this.getAuth();
    await auth.createUserWithEmailAndPassword(email, password);
  }
  async signWithGithub() {
    const auth = this.getAuth();
    const provider = new firebase.auth.GithubAuthProvider();
    return await auth.signInWithPopup(provider);
  }

  async signWithGoogle(sign) {
    const auth = this.getAuth();
    const provider = new firebase.auth.GoogleAuthProvider();
    switch (sign) {
      case "signIn":
        await auth.signInWithPopup(provider);
        await firebase.auth().getRedirectResult();
        break;
      case "signInWithRedirect":
        await auth.signInWithRedirect(provider);
        await firebase.auth().getRedirectResult();
        break;
      case "signInWithRedirectAndLink":
        await auth.signInWithRedirect(provider);
        await firebase.auth().getRedirectResult();
        break;

      default:
        break;
    }
  }
  async phoneSignIn(
    phoneNumber: string,
    verificationCode: firebase.auth.ApplicationVerifier
  ) {
    const auth = this.getAuth();
    await auth.signInWithPhoneNumber(phoneNumber, verificationCode);
  }

  async signOut() {
    const auth = this.getAuth();
    await auth.signOut();
  }
}
