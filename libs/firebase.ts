import firebase from "firebase/compat/app";
import router from "next/router";
import { Permission } from "./permission";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/functions";
import "firebase/compat/analytics";
import "firebase/compat/performance";
import "firebase/compat/database";
import "firebase/messaging";

export class Firebase {
  settings() {
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
    firebase.initializeApp(this.settings());
    console.log(`Initialize Firebase ${firebase.apps.length} app`);
  }

  user(): firebase.User | null {
    return firebase.auth().currentUser;
  }
  getCurrentUser() {
    return this.user();
  }

  userName(): string | null | undefined {
    return this.user()?.displayName;
  }

  photoUrl(): string | null | undefined {
    return this.user()?.photoURL;
  }

  defaultPhotoUrl(): string {
    return "/static/images/blank-profile.png";
  }

  email(): string {
    return this.user()?.email as string;
  }

  tokenId(force: boolean): Promise<string> | undefined {
    return this.user()?.getIdToken(force);
  }

  userData() {
    return this.getFireStore().collection("users").doc(this.user()?.uid);
  }

  isConnected(): boolean {
    return this.auth().currentUser !== null;
  }

  getStorage() {
    return firebase.storage();
  }

  getFireStore() {
    return firebase.firestore();
  }

  auth() {
    return firebase.auth();
  }

  messaging() {
    return firebase.messaging();
  }

  firebase() {
    return firebase;
  }

  database() {
    return firebase.database();
  }

  analytics() {
    return firebase.analytics();
  }

  functions() {
    return firebase.functions();
  }

  collection(collection: string) {
    return firebase.firestore().collection(collection);
  }
  collectionId(collection: string) {
    return this.collection(collection).doc().id;
  }

  reference(ref: string, child: string) {
    return this.database().ref(ref).child(child);
  }
  emptyString(str: string) {
    return str === "";
  }
  has(key: string): boolean {
    const permission = new Permission();
    return permission.has(key);
  }
  documentPath(collection: string, documentPath: string) {
    return this.collection(collection).doc(documentPath);
  }

  id(): string | undefined {
    return this.user()?.uid;
  }

  performance() {
    return firebase.performance();
  }

  import(url: string) {
    return this.functions().httpsCallable(url);
  }

  stateChanged(callback: (user: firebase.User | null) => void) {
    const auth = this.auth();
    auth.onAuthStateChanged(callback);
  }
  exist(collection: string): boolean {
    this.collection(collection)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.empty;
      });
    return true;
  }

  currentPassword(currentPassword: string) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      this.email() as string,
      currentPassword
    );
    return this.user()?.reauthenticateWithCredential(credential);
  }

  async updatePassword(currentPassword: string, newPassword: string) {
    await this.currentPassword(currentPassword)?.then(async () => {
      return await this.user()?.updatePassword(newPassword);
    });
  }
  async getLogs() {
    return await this.analytics().logEvent("getLogs");
  }
  async snapshot(collection: string, documentPath: string) {
    return await this.collection(collection)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          if (doc.id === documentPath) {
            return await doc.data();
          }
        });
      })
      .then((data) => data)
      .catch((error) => console.log("Error getting documents: ", error));
  }

  data(
    phone: string,
    name: string,
    email: string,
    frequency: string,
    collectTime: string,
    address: string,
    collection: string
  ) {
    return {
      id: this.collection(collection).doc().id,
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
    return await this.sign(email, password).then(async () => {
      await router.push(url);
      await this.collection(collection).doc(documentPath).set({
        name: this.userName(),
        email: this.email(),
      });
    });
  }
  async sign(email: string, password: string) {
    const auth = this.auth();
    return await auth.signInWithEmailAndPassword(email, password);
  }

  async emailVerification() {
    const user = this.user();
    await user?.sendEmailVerification();
  }

  async passwordResetEmail(email: string) {
    const auth = this.auth();
    await auth.sendPasswordResetEmail(email);
  }
  async saveColor(color: Array<string>) {
    this.collection("colors").doc(this.user()?.uid).set({
      color: color,
    });
  }
  async logOut() {
    const auth = this.auth();
    await auth.signOut();
  }

  async update(collection: string, documentPath: string, data: any) {
    const collectionRef = this.collection(collection);
    const documentRef = collectionRef.doc(documentPath);
    await documentRef.update(data);
  }

  async create(collection: string, data: any) {
    const collectionRef = this.collection(collection);
    await collectionRef.add(data);
  }

  async delete(collection: string, documentPath: string) {
    const collectionRef = this.collection(collection);

    const documentRef = collectionRef.doc(documentPath);
    await documentRef.delete();
  }

  async get(collection: string, documentPath: string) {
    const collectionRef = this.collection(collection);
    const documentRef = collectionRef.doc(documentPath);
    return await documentRef.get();
  }

  async getAll(collection: string) {
    const collectionRef = this.collection(collection);
    return await collectionRef.get();
  }

  async getAllData(collection: string, data: []) {
    const collectionRef = this.collection(collection);
    return await collectionRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push(doc.data() as never);
      });
      return data;
    });
  }

  async getAllDataWithId(collection: string, data: []) {
    const collectionRef = this.collection(collection);
    return await collectionRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as never);
      });
      return data;
    });
  }

  async getAllDataWithIdAndName(collection: string, data: []) {
    const collectionRef = this.collection(collection);
    return await collectionRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          name: doc.data().name,
          ...doc.data(),
        } as never);
      });
      return data;
    });
  }
  async withId(collection: string, documentPath: string) {
    const collectionRef = this.collection(collection);
    const documentRef = collectionRef.doc(documentPath);
    return await documentRef.get().then((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  }
  where(
    collection: string,
    field: string,
    operator: firebase.firestore.WhereFilterOp,
    value: string
  ) {
    return this.collection(collection).where(field, operator, value);
  }
  async orderBy(
    collection: string,
    field: string,
    direction: firebase.firestore.OrderByDirection
  ) {
    return this.collection(collection).orderBy(field, direction);
  }
  async fetch(collection: string, documentPath: string) {
    const collectionRef = this.collection(collection);
    const documentRef = collectionRef.doc(documentPath);
    return await documentRef.get().then((doc) => {
      return doc.data();
    });
  }

  async fetchAll(collection: string) {
    const collectionRef = this.collection(collection);
    return await collectionRef.get().then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return doc.data();
      });
    });
  }

  async getAllByField(collection: string, field: string, value: any) {
    const collectionRef = this.collection(collection);
    return await collectionRef.where(field, "==", value).get();
  }
  async updateUser(name: string, email: string, password: string) {
    const user = this.user();
    await user?.updateProfile({
      displayName: name,
    });
    await user?.updateEmail(email);
    await user?.updatePassword(password);
  }

  async signUp(email: string, password: string) {
    const auth = this.auth();
    await auth.createUserWithEmailAndPassword(email, password);
  }

  async signWithGithub() {
    const auth = this.auth();
    const provider = new firebase.auth.GithubAuthProvider();
    return await auth.signInWithPopup(provider);
  }

  async signWith(sign: string) {
    const auth = this.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    switch (sign) {
      case "withPopup":
        await auth.signInWithPopup(provider);
        await firebase.auth().getRedirectResult();
        break;
      case "redirect":
        await auth.signInWithRedirect(provider);
        await firebase.auth().getRedirectResult();
        break;
      case "redirectAndLink":
        await auth.signInWithRedirect(provider);
        await firebase.auth().getRedirectResult();
        break;
      case "withGithub":
        await this.signWithGithub();
        await firebase.auth().getRedirectResult();
        break;

      default:
        break;
    }
  }
  async interceptor(url: string, callback: (error: any) => void) {
    return await this.functions().httpsCallable(url).call(callback);
  }
  async phoneSignIn(
    phoneNumber: string,
    verificationCode: firebase.auth.ApplicationVerifier
  ) {
    const auth = this.auth();
    await auth.signInWithPhoneNumber(phoneNumber, verificationCode);
  }

  async signOut() {
    const auth = this.auth();
    await auth.signOut();
  }
}
