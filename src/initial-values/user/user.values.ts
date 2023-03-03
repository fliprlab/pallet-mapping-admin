export interface IUserFormValues {
  name: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

export const UserInitialValues: IUserFormValues = {
  name: "",
  mobile: "",
  password: "",
  confirmPassword: "",
};
