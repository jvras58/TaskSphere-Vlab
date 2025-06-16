const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function handleErrorResponse(res: Response) {
  return res.json().then(error => {
    throw new Error(error.message || 'Erro inesperado');
  });
}

export async function getTasksByProject(projectId: string, token: string) {
  const res = await fetch(`${BASE_URL}/api/tasks/projects/${projectId}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return handleErrorResponse(res);
  return res.json();
}

export async function createTask(projectId: string, data: any, token: string) {
  const res = await fetch(`${BASE_URL}/api/tasks/projects/${projectId}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) return handleErrorResponse(res);
  return res.json();
}

export async function updateTask(taskId: string, data: any, token: string) {
  const res = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) return handleErrorResponse(res);
  return res.json();
}

export async function deleteTask(taskId: string, token: string) {
  const res = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return handleErrorResponse(res);
  return true;
}
