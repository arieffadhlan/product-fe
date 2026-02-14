export interface IAuthProps {
  id: number;
  gender: string;
  firstName: string;
  refreshToken: string;
  email: string;
  image: string;
  username: string;
  lastName: string;
  accessToken: string;
}

export interface IAuthUser {
  id: number;
  gender: string;
  firstName: string;
  email: string;
  image: string;
  username: string;
  lastName: string;
}