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

export type Task = {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  description?: string;
  dueDate: string;
  imageUrl?: string;
  projectId: string;
  creatorId: string;
  collaborators: User[];
};


export interface AuthResponse {
  user: User;
  token: { accessToken: string };
}