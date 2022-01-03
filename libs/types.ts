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
    [key: string]: string;
  };
  key: string;
  id?: Number;
  isLoggedIn: boolean;
  isAdmin: string;
  isUser: string;
  isGuest: string;
}

export enum Rights {
  Admin = "0",
  User = "1",
  Guest = "2",
}
