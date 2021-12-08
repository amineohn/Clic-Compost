import { Permissions, set } from "./types";
import { Firebase } from "./firebase";
import router from "next/router";
export class Permission {
  public permission: Map<string, Permissions>;
  constructor() {
    this.permission = new Map<string, Permissions>();
  }
  public async init(): Promise<void> {
    const fire = new Firebase();
    const user = await fire.auth().currentUser;
    if (user) {
      const { uid } = user;
      const userRef = fire.database().ref(`users/${uid}`);
      const userData = await userRef.once("value");
      const userPermission: Permissions = userData.val();
      if (userPermission.isAdmin) {
        this.permission.set(set.Admin, userPermission);
      }
      if (userPermission.isUser) {
        this.permission.set(set.User, userPermission);
      }
      if (userPermission.isGuest) {
        this.permission.set(set.Guest, userPermission);
      }
      if (
        userPermission.isAdmin &&
        userPermission.isUser &&
        userPermission.isGuest &&
        userPermission.isLoggedIn
      ) {
        // well..
        router.push("/");
      }
      if (
        !userPermission.isLoggedIn &&
        !userPermission.isAdmin &&
        !userPermission.isUser &&
        !userPermission.isGuest
      ) {
        router.push("/dash");
      }
      if (!userPermission.isLoggedIn) {
        // huh?
        router.push("/");
      }
      if (userPermission) {
        // todo: make it work.
        this.permission = userPermission;
      } else {
        this.permission = {
          isAdmin: false,
          isUser: false,
          isGuest: true,
        };
      }
    } else {
      this.permission = {
        isAdmin: false,
        isUser: false,
        isGuest: true,
      };
    }
  }

  public add(key: string, permission: Permissions): void {
    this.permission.set(key, permission);
  }

  public get(key: string): Permissions | undefined {
    return this.permission.get(key);
  }

  public has(key: string): boolean {
    return this.permission.has(key);
  }

  public delete(key: string): void {
    this.permission.delete(key);
  }
  public all(): Map<string, Permissions> {
    return this.permission;
  }
}
