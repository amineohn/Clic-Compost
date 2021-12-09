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
  key: string;
  id?: Number;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isUser: boolean;
  isGuest: boolean;
}

export enum Rights {
  Admin = "Admin",
  User = "User",
  Guest = "Guest",
}
