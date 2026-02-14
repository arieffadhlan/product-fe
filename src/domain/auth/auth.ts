export interface IAuthProps {
  id: number;
  email: string;
  image: string;
  username: string;
  lastName: string;
  accessToken: string;
  gender: string;
  firstName: string;
  refreshToken: string;
}

export interface IAuthUser {
  id: number;
  email: string;
  image: string;
  username: string;
  lastName: string;
  gender: string;
  firstName: string;
}
