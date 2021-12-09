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

export interface Permissions {
  all: {
    [key: string]: any;
  };
  key: [];
  id?: Number;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isUser: boolean;
  isGuest: boolean;
}

export enum setPermission {
  Admin = "Admin",
  User = "User",
  Guest = "Guest",
}
