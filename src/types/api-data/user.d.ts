type TUser = {
  _id: string;
  userName: string;
  password: string;
  origin: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
