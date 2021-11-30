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
    console.log("Initialize Firebase \n app(s): %d", firebase.apps.length);
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
  getErrors(code: string, errorMessage: string) {
    switch (code) {
      case "auth/invalid-custom-token":
        errorMessage =
          "Le format de jeton personnalisé est incorrect. Veuillez vérifier la documentation.";
        break;
      case "auth/custom-token-mismatch":
        errorMessage =
          "Le jeton personnalisé correspond à une audience différente.";
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
    url: string
  ) {
    const auth = this.getAuth();
    return await auth
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        await router.push(url);
        await this.getCollection(collection).doc(this.getUserId()).set({
          name: this.getUserName(),
          email: this.getEmail(),
        });
      });
  }
  async signUp(email: string, password: string) {
    const auth = this.getAuth();
    await auth.createUserWithEmailAndPassword(email, password);
  }
  async resetPassword(email: string) {
    const auth = this.getAuth();
    await auth.sendPasswordResetEmail(email);
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
  async signOut() {
    const auth = this.getAuth();
    await auth.signOut();
  }
}
