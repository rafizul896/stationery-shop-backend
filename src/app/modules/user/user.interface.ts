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
  status: 'active' | 'block';
  shippingAddress: TShippingAddress;
  isUpdateShippingAddress: boolean;
}

export type IRole = 'admin' | 'user';
