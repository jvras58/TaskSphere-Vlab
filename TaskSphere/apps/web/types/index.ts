export interface User {
  id: string;
  name: string;
  email: string;
  role_id: number;
  bio?: string;
  image?: string;
}

export type Project = {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  creatorId: string;
  collaborators: User[];
};


export interface AuthResponse {
  user: User;
  token: { accessToken: string };
}