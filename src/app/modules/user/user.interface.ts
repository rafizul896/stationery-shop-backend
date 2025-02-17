export type TShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  contactNumber: number;
};

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: IRole;
  isBlocked: boolean;
  shippingAddress: TShippingAddress;
  isUpdateShippingAddress: boolean;
}

export type IRole = 'admin' | 'user';
