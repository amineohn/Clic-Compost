import { Permissions, Rights } from "./types";
import { Firebase } from "./firebase";
import router from "next/router";
export class Permission {
  public permission: Map<string, Permissions>;
  constructor() {
    const fire = new Firebase();
    this.permission = new Map<string, Permissions>();
    this.init();
    this.get = this.get.bind(this);
    this.add = this.add.bind(this);
    this.has = this.has.bind(this);
    this.delete = this.delete.bind(this);
    this.all = this.all.bind(this);
    this.clear = this.clear.bind(this);
    this.size = this.size.bind(this);
    this.all = this.all.bind(this);
    this.set = this.set.bind(this);
    this.isAdmin = this.isAdmin.bind(this);
    this.isUser = this.isUser.bind(this);
    this.isGuest = this.isGuest.bind(this);
    this.permissionList = this.permissionList.bind(this);
    if (fire.exist("rights")) {
      this.insertValues();
    }
  }
  public async insertValues(): Promise<void> {
    const fire = new Firebase();
    const rights = [
      {
        id: 1,
        name: Rights.Admin,
        isAdmin: true,
        isUser: true,
        isGuest: true,
      },
      {
        id: 2,
        name: Rights.User,
        isAdmin: false,
        isUser: true,
        isGuest: true,
      },
      {
        id: 3,
        name: Rights.Guest,
        isAdmin: false,
        isUser: false,
        isGuest: true,
      },
    ];
    for (const right of rights) {
      await fire
        .collection("rights")
        .doc(right.name)
        .set(right)
        .catch((err) => console.log(err));
    }
  }

  public async init(): Promise<void> {
    const fire = new Firebase();
    if (this.size() === 0) {
      await fire
        .collection("rights")
        .orderBy("id")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.add(doc.id, {
              all: doc.data(),
              key: doc.id,
              id: doc.data().id,
              isLoggedIn: false,
              isAdmin: true,
              isUser: false,
              isGuest: false,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
      await fire
        .collection("rights")
        .orderBy("id")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.add(doc.id, {
              all: doc.data(),
              key: doc.id,
              id: doc.data().id,
              isLoggedIn: false,
              isAdmin: false,
              isUser: true,
              isGuest: false,
            });
          });
        })
        .catch((err) => console.log(err));
      await fire
        .collection("rights")
        .orderBy("id")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.add(doc.id, {
              all: doc.data(),
              key: doc.id,
              id: doc.data().id,
              isLoggedIn: false,
              isAdmin: false,
              isUser: false,
              isGuest: true,
            });
          });
        })
        .catch((err) => console.log(err));
    }
    const user = await fire.user();
    if (user) {
      const userRef = fire.database().ref(`users/${fire.id()}`);
      userRef.on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.permission.forEach((value, key) => {
            if (value.all.id === data.id) {
              this.permission.set(key, {
                all: value.all,
                key: value.key,
                id: value.id,
                isLoggedIn: true,
                isAdmin: value.isAdmin,
                isUser: value.isUser,
                isGuest: value.isGuest,
              });
            }
          });
        }
      });
      const userData = await userRef.once("value");
      const userPermission: Permissions = userData.val();
      if (userPermission.isAdmin) {
        this.set(Rights.Admin, userPermission);
      }
      if (userPermission.isUser) {
        this.set(Rights.User, userPermission);
      }
      if (userPermission.isGuest) {
        this.set(Rights.Guest, userPermission);
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
        this.set(fire.id() as string, userPermission);
      } else {
        this.set(fire.id() as string, {
          all: {},
          key: "",
          id: 0,
          isLoggedIn: false,
          isAdmin: false,
          isUser: false,
          isGuest: false,
        });
      }
    } else {
      this.set(Rights.Guest, {
        all: {},
        key: "",
        id: 0,
        isLoggedIn: false,
        isAdmin: false,
        isUser: false,
        isGuest: true,
      });
    }
  }

  public set(key: string, permission: Permissions): void {
    this.permission.set(key, permission);
  }

  public add(key: string, permission: Permissions): void {
    this.permission.set(key, permission);
  }

  public get(key: string): Permissions | undefined {
    return this.permission.get(key);
  }

  public permissionList(): string[] {
    return Array.from(this.permission.keys());
  }

  public has(key: string): boolean {
    const fire = new Firebase();
    switch (key) {
      case Rights.Admin:
        fire
          .collection("rights")
          .orderBy("id")
          .get()
          .catch((err) => {
            console.log(err);
          });
        return this.isAdmin();
      case Rights.User:
        fire
          .collection("rights")
          .orderBy("id")
          .get()
          .catch((err) => {
            console.log(err);
          });
        return this.isUser();
      case Rights.Guest:
        fire
          .collection("rights")
          .orderBy("id")
          .get()
          .catch((err) => {
            console.log(err);
          });
        return this.isGuest();
      default:
        return false;
    }
  }

  public delete(key: string): void {
    this.permission.delete(key);
  }
  public all(): Map<string, Permissions> {
    return this.permission;
  }
  public clear(): void {
    this.permission.clear();
  }
  public size(): number {
    return this.permission.size;
  }
  public isAdmin(): boolean {
    return this.permission.get(Rights.Admin)?.isAdmin as boolean;
  }
  public isUser(): boolean {
    return this.permission.get(Rights.User)?.isUser as boolean;
  }
  public isGuest(): boolean {
    return this.permission.get(Rights.Guest)?.isGuest as boolean;
  }
}
