import { form } from "../utils/regex";
export class Validate {
  constructor() {}
  email(email: string) {
    return form.send.email.test(String(email).toLowerCase());
  }
  password(password: string) {
    return form.send.password.test(password);
  }
  phone(phone: string) {
    return form.send.phone.test(phone);
  }
  collectTime(collectTime: string) {
    return form.send.collectTime.test(collectTime);
  }
  adress(address: string) {
    return form.send.address.test(address);
  }
  name(name: string) {
    return form.send.name.test(name);
  }
  frequency(frequency: string) {
    return form.send.frequency.test(frequency);
  }
  errors(code: string, errorMessage: string) {
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
}
