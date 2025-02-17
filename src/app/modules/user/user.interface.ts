export interface IUser {
  name: string;
  email: string;
  password: string;
  role: IRole;
  isBlocked: boolean;
}

export type IRole = 'admin' | 'user';
