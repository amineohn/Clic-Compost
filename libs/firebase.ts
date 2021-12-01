import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/functions";
import "firebase/compat/analytics";
import "firebase/compat/performance";
import "firebase/messaging";
import router from "next/router";
import { form } from "../utils/regex";
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
    return this.getAuth().currentUser?.getIdToken();
  }
  getUserData() {
    return firebase.firestore().collection("users").doc(this.getUser()?.uid);
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
  getUserId() {
    return this.getUser()?.uid;
  }
  getPerformance() {
    return firebase.performance();
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
  validateEmail(email: string) {
    return form.send.email.test(String(email).toLowerCase());
  }
  validatePassword(password: string) {
    return form.send.password.test(password);
  }
  validatePhone(phone: string) {
    return form.send.phone.test(phone);
  }
  validateCollectTime(collectTime: string) {
    return form.send.collectTime.test(collectTime);
  }
  validateAdress(address: string) {
    return form.send.address.test(address);
  }
  validateName(name: string) {
    return form.send.name.test(name);
  }

  validateFrequency(frequency: string) {
    return form.send.frequency.test(frequency);
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
  getErrors(code: string, errorMessage: string) {
    switch (code) {
      case "auth/invalid-custom-token":
        errorMessage =
          "Le format du token(custom) est incorrect. Veuillez vérifier la documentation.";
        break;
      case "auth/custom-token-mismatch":
        errorMessage = "Le token(custom) correspond à une audience différente.";
        break;
      case "auth/invalid-credential":
        errorMessage =
          "Les informations d'authentification fournies sont mal formées ou ont expiré.";
        break;
      case "auth/operation-not-allowed":
        errorMessage =
          "La connexion par mot de passe est désactivée pour ce projet.";
        break;
      case "auth/user-disabled":
        errorMessage =
          "Le compte utilisateur a été désactivé par un administrateur.";
        break;
      case "auth/user-token-expired":
        errorMessage =
          "Les informations d'identification de l'utilisateur ne sont plus valides. L'utilisateur doit se reconnecter.";
        break;
      case "auth/web-storage-unsupported":
        errorMessage =
          "Le navigateur de l'utilisateur ne prend pas en charge le stockage Web.";
        break;
      case "auth/invalid-email":
        errorMessage = "L'adresse e-mail n'est pas valide.";
        break;
      case "auth/user-not-found":
        errorMessage =
          "Il n'y a pas d'enregistrement utilisateur correspondant à cet identifiant.";
        break;
      case "auth/wrong-password":
        errorMessage =
          "Le mot de passe est invalide ou l'utilisateur n'a pas de mot de passe.";
        break;
      case "auth/email-already-in-use":
        errorMessage =
          "L'adresse e-mail est déjà utilisée par un autre compte.";
        break;
      case "auth/weak-password":
        errorMessage = "Le mot de passe doit contenir au moins 6 caractères.";
        break;
      case "auth/requires-recent-login":
        errorMessage =
          "L'utilisateur doit se reconnecter avec son compte récent.";
        break;
      case "auth/user-mismatch":
        errorMessage =
          "L'utilisateur n'est pas autorisé à se connecter avec ce compte.";
        break;
      case "auth/invalid-api-key":
        errorMessage = "La clé API fournie est invalide ou a expiré.";
        break;
      case "auth/network-request-failed":
        errorMessage =
          "La requête de réseau a échoué. Veuillez vérifier votre connexion Internet.";
        break;
      case "auth/popup-blocked":
        errorMessage =
          "Le navigateur a bloqué une fenêtre pop-up. Veuillez vérifier que le bloqueur de fenêtres pop-up est désactivé.";
        break;
      case "auth/popup-closed-by-user":
        errorMessage = "La fenêtre pop-up a été fermée par l'utilisateur.";
        break;
      case "auth/unauthorized-domain":
        errorMessage = "L'adresse e-mail n'est pas autorisée pour ce domaine.";
        break;
      case "auth/invalid-action-code":
        errorMessage = "Le code d'action fourni est invalide ou a expiré.";
        break;
      case "auth/invalid-verification-code":
        errorMessage = "Le code de vérification fourni est invalide.";
        break;
      case "auth/invalid-verification-id":
        errorMessage = "L'ID de vérification fourni est invalide.";
        break;
      case "auth/invalid-phone-number":
        errorMessage = "Le numéro de téléphone fourni est invalide.";
        break;
      case "auth/quota-exceeded":
        errorMessage =
          "La limite de quota a été dépassée. Veuillez réessayer ultérieurement.";
        break;
      case "auth/user-cancelled":
        errorMessage =
          "L'utilisateur a annulé l'opération. L'opération n'a pas été exécutée.";
        break;

      default:
        errorMessage = "Une erreur inconnue s'est produite.";
        break;
    }
    return errorMessage;
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
