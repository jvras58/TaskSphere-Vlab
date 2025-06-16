export interface CreateTaskInput {
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  dueDate: string;
  imageUrl: string;
}

export interface UpdateTaskInput {
  title?: string;
  status?: 'todo' | 'in_progress' | 'done';
  dueDate?: string;
  imageUrl?: string;
}
