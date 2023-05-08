export interface IHubAdmin {
  username: string;
  origin: string;
  password: string;
}

export const HubAdminIniValues: IHubAdmin = {
  username: "",
  origin: "",
  password: "",
};

export interface IHubAdminResetPassIniValues {
  password: string;
  confirm_password: string;
}

export const HubAdminResetPassIniValues = {
  password: "",
  confirm_password: "",
};
