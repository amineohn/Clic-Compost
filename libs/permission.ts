import { Permissions, Rights } from "./types";
import { Firebase } from "./firebase";
import router from "next/router";
export class Permission {
  public permission: Map<string, Permissions>;
  constructor() {
    this.permission = new Map<string, Permissions>();
    this.init();
  }
  // check user permission if user exist in permission
  public async init(): Promise<void> {
    const fire = new Firebase();
    const user = await fire.auth().currentUser;
    if (user) {
      const { uid } = user;
      const userRef = fire.database().ref(`users/${uid}`);
      const userData = await userRef.once("value");
      const userPermission: Permissions = userData.val();
      if (userPermission.isAdmin) {
        this.permission.set(Rights.Admin, userPermission);
      }
      if (userPermission.isUser) {
        this.permission.set(Rights.User, userPermission);
      }
      if (userPermission.isGuest) {
        this.permission.set(Rights.Guest, userPermission);
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
      if (!userPermission.isLoggedIn) {
        router.push("/login");
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
        this.permission.set(uid, userPermission);
      } else {
        this.permission.set(uid, {
          all: {},
          key: [],
          id: 0,
          isLoggedIn: false,
          isAdmin: false,
          isUser: false,
          isGuest: false,
        });
      }
    } else {
      this.permission.set("guest", {
        all: {},
        key: ,
        id: 0,
        isLoggedIn: false,
        isAdmin: false,
        isUser: false,
        isGuest: true,
      });
    }
  }

  private add(key: string, permission: Permissions): void {
    this.permission.set(key, permission);
  }

  private get(key: string): Permissions | undefined {
    return this.permission.get(key);
  }

  private permissionList(): string[] {
    return Array.from(this.permission.keys());
  }

  private has(key: string): boolean {
    return this.permission.has(key);
  }

  private delete(key: string): void {
    this.permission.delete(key);
  }
  private all(): Map<string, Permissions> {
    return this.permission;
  }
  private clear(): void {
    this.permission.clear();
  }
  private size(): number {
    return this.permission.size;
  }
}
