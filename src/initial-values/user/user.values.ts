export interface IUserFormValues {
  userName: string;
  origin: string;
  password: string;
}

export interface IHubUserFormValues {
  userName: string;
  password: string;
}

export const HubUserInitialValues: IHubUserFormValues = {
  userName: "",
  password: "",
};

export const UserInitialValues: IUserFormValues = {
  userName: "",
  origin: "",
  password: "",
};

export interface IUserResetPassIniValues {
  password: string;
  confirm_password: string;
}

export const UserResetPassIniValues = {
  password: "",
  confirm_password: "",
};
