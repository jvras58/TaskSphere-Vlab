export interface User {
  id: string;
  name: string;
  email: string;
  role_id: number;
  bio?: string;
  image?: string;
}


export interface AuthResponse {
  user: User;
  token: { accessToken: string };
}