import { Permissions, Rights } from "./types";
import { Firebase } from "./firebase";
import router from "next/router";
export class Permission {
  public permission: Map<string, Permissions>;
  public fire = new Firebase();
  constructor() {
    this.permission = new Map<string, Permissions>();
    this.init();
    /*if (fire.exist("rights")) {
      this.insertValues();
    } */
  }
  public async insertValues(): Promise<void> {
    const rights = [
      {
        name: "Administrateur",
        isAdmin: Rights.Admin,
      },
      {
        name: "Utilisateur",
        isUser: Rights.User,
      },
      {
        name: "Invité",
        isGuest: Rights.Guest,
      },
    ];
    for (const right of rights) {
      await this.fire
        .collection("rights")
        .doc(right.name)
        .set(right)
        .catch((err) => console.log(err));
    }
  }

  public async init(): Promise<void> {
    const fire = new Firebase();
    await fire
      .collection("rights")
      .orderBy("name")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.add(doc.id, {
            all: doc.data(),
            key: doc.id,
            id: doc.data().id,
            isLoggedIn: false,
            isAdmin: Rights.Admin,
            isUser: Rights.User,
            isGuest: Rights.Guest,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    await fire
      .collection("rights")
      .orderBy("name")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.add(doc.id, {
            all: doc.data(),
            key: doc.id,
            id: doc.data().id,
            isLoggedIn: false,
            isAdmin: Rights.Admin,
            isUser: Rights.User,
            isGuest: Rights.Guest,
          });
        });
      })
      .catch((err) => console.log(err));

    await fire
      .collection("rights")
      .orderBy("name")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.add(doc.id, {
            all: doc.data(),
            key: doc.id,
            id: doc.data().id,
            isLoggedIn: false,
            isAdmin: Rights.Admin,
            isUser: Rights.User,
            isGuest: Rights.Guest,
          });
        });
      })
      .catch((err) => console.log(err));

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
          isAdmin: Rights.Admin,
          isUser: Rights.User,
          isGuest: Rights.Guest,
        });
      }
    } else {
      this.set(Rights.Guest, {
        all: {},
        key: "",
        id: 0,
        isLoggedIn: false,
        isAdmin: Rights.Admin,
        isUser: Rights.User,
        isGuest: Rights.Guest,
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
    return (this.permission.get(Rights.Admin)?.isAdmin as string) === "0";
  }
  public isUser(): boolean {
    return (this.permission.get(Rights.User)?.isUser as string) === "1";
  }
  public isGuest(): boolean {
    return (this.permission.get(Rights.Guest)?.isGuest as string) === "2";
  }
  public isLoggedIn(): boolean {
    return this.permission.get(Rights.Guest)?.isLoggedIn === true;
  }
}
