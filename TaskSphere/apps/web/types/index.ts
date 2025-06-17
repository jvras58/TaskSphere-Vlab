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
  description?: string;
  dueDate: string;
  status: 'todo' | 'in_progress' | 'done';
  imageUrl: string;
  projectId: string;
  creatorId: string;
  assigneeId?: string | null;
  assignee?: {
    id: string;
    name: string;
  } | null;
  collaborators?: {
    id: string;
    name: string;
  }[];
};





export interface AuthResponse {
  user: User;
  token: { accessToken: string };
}