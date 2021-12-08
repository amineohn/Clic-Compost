export type Errors = {
  code: string;
  message: string;
};
export type Item = {
  [key: string]: string;
  name: string;
  address: string;
  phone: string;
  collectTime: string;
  frequency: string;
};

export type Permissions = {
  [key: string]: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isUser: boolean;
  isGuest: boolean;
};

export enum set {
  Admin = "Admin",
  User = "User",
  Guest = "Guest",
}
